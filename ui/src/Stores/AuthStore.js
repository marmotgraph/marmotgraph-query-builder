/*
 * Copyright 2018 - 2021 Swiss Federal Institute of Technology Lausanne (EPFL)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * This open source software code was developed in part or in whole in the
 * Human Brain Project, funded from the European Union's Horizon 2020
 * Framework Programme for Research and Innovation under
 * Specific Grant Agreements No. 720270, No. 785907, and No. 945539
 * (Human Brain Project SGA1, SGA2 and SGA3).
 *
 */

import { observable, computed, action, runInAction, makeObservable } from "mobx";
import API from "../Services/API";

const rootPath = window.rootPath || "";

const userKeys = {
  id: "https://schema.hbp.eu/users/nativeId",
  username: "http://schema.org/alternateName", //NOSONAR it's only a schema
  email: "http://schema.org/email", //NOSONAR it's only a schema
  displayName: "http://schema.org/name", //NOSONAR it's only a schema
  givenName: "http://schema.org/givenName", //NOSONAR it's only a schema
  familyName: "http://schema.org/familyName", //NOSONAR it's only a schema
  picture: "https://schema.hbp.eu/users/picture"
};

const mapUserProfile = data => {
  const user = {};
  if (data && data.data) {
    Object.entries(userKeys).forEach(([name, fullyQualifiedName]) => {
      if (data.data[fullyQualifiedName]) {
        user[name] = data.data[fullyQualifiedName];
      }
    });
  }
  return user;
};

export class AuthStore {
  isUserAuthorized = false;
  isUserAuthorizationInitialized = false;
  isSpacesInitialized = false;
  isSpacesFetched = false;
  user = null;
  spaces = [];
  isRetrievingUserProfile = false;
  userProfileError = null;
  isRetrievingSpaces = false;
  spacesError = null;
  authError = null;
  authSuccess = false;
  isTokenExpired = false;
  isInitializing = false;
  initializationError = null;
  isLogout = false;
  keycloak = null;
  commit = null;

  transportLayer = null;

  constructor(transportLayer) {
    makeObservable(this, {
      isUserAuthorized: observable,
      isUserAuthorizationInitialized: observable,
      user: observable,
      spaces: observable,
      privateSpace: computed,
      sharedSpaces: computed,
      allowedSharedSpacesToCreateQueries: computed, 
      commit: observable,
      isRetrievingUserProfile: observable,
      userProfileError: observable,
      isRetrievingSpaces: observable,
      isSpacesInitialized: observable,
      isSpacesFetched: observable,
      spacesError: observable,
      authError: observable,
      authSuccess: observable,
      isTokenExpired: observable,
      isInitializing: observable,
      initializationError: observable,
      isLogout: observable,
      accessToken: computed,
      isAuthenticated: computed,
      hasSpaces: computed,
      logout: action,
      retrieveUserProfile: action,
      retrieveSpaces: action,
      initializeKeycloak: action,
      login: action,
      authenticate: action,
      firstName: computed
    });

    this.transportLayer = transportLayer;

  }

  get accessToken() {
    return this.isAuthenticated ? this.keycloak.token: "";
  }

  get isAuthenticated() {
    return this.authSuccess;
  }

  get hasUserProfile() {
    return !!this.user;
  }

  get hasSpaces() {
    return !!this.spaces.length;
  }

  getSpace(name) {
    return this.spaces.find(s => s.name === name);
  }

  get privateSpace() {
    return this.spaces.find(s => s.isPrivate);
  }

  get sharedSpaces() {
    return this.spaces.filter(s => !s.isPrivate);
  }

  get allowedSharedSpacesToCreateQueries() {
    return this.sharedSpaces.filter(s => s.permissions && s.permissions.canCreate);
  }

  get firstName() {
    const firstNameReg = /^([^ ]+) .*$/;
    if (this.user) {
      if (this.user.givenName) {
        return this.user.givenName;
      }
      if (this.user.displayName) {
        if (firstNameReg.test(this.user.displayName)) {
          return this.user.displayName.match(firstNameReg)[1];
        }
        return this.user.displayName;
      }
      if (this.user.username) {
        return this.user.username;
      }
    }
    return "";
  }

  logout() {
    this.authSuccess = false;
    this.isTokenExpired = true;
    this.isUserAuthorized = false;
    this.user = null;
    this.spaces = [];
    this.isUserAuthorizationInitialized = false;
    this.isSpacesInitialized = false;
    this.keycloak.logout({redirectUri: `${window.location.protocol}//${window.location.host}${rootPath}/logout`});
    this.isLogout = true;
  }

  async retrieveUserProfile() {
    if (this.isAuthenticated && !this.isRetrievingUserProfile && !this.user) {
      this.userProfileError = null;
      this.isRetrievingUserProfile = true;
      this.isUserAuthorizationInitialized = true;
      try {
        const { data } = await this.transportLayer.getUserProfile();
        runInAction(() => {
          this.isUserAuthorized = true;
          this.user = mapUserProfile(data);
          this.isRetrievingUserProfile = false;
        });
      } catch (e) {
        runInAction(() => {
          if (e.response && e.response.status === 403) {
            this.isUserAuthorized = false;
            this.isRetrievingUserProfile = false;
            this.isUserAuthorizationInitialized = false;
          } else {
            this.isUserAuthorized = false;
            this.userProfileError = e.message ? e.message : e;
            this.isRetrievingUserProfile = false;
            this.isUserAuthorizationInitialized = false;
          }
        });
      }
    }
  }

  async retrieveSpaces() {
    if(this.isAuthenticated && this.isUserAuthorized && !this.isSpacesFetched && !this.isRetrievingSpaces) {
      try {
        this.spacesError = null;
        this.isRetrievingSpaces = true;
        this.isSpacesInitialized = true;
        const { data } = await this.transportLayer.getSpaces();
        runInAction(() => {
          this.spaces = data && Array.isArray(data.data)? data.data: [];
          this.isSpacesFetched = true;
          this.isRetrievingSpaces = false;
        });
      } catch(e) {
        runInAction(() => {
          if (e.response && e.response.status === 403) {
            this.spaces = [];
            this.isSpacesFetched = true;
            this.isRetrievingSpaces = false;
            this.isSpacesInitialized = false;
          } else {
            this.spacesError = e.message ? e.message : e;
            this.isRetrievingSpaces = false;
            this.isSpacesInitialized = false;
          }
        });
      }
    }
  }

  login() {
    if(!this.isAuthenticated && this.keycloak) {
      this.keycloak.login();
    }
  }
  initializeKeycloak(keycloakSettings) {
    const keycloak = window.Keycloak(keycloakSettings);
    runInAction(() => this.keycloak = keycloak);
    keycloak.onAuthSuccess = () => {
      runInAction(() => {
        this.authSuccess = true;
        this.isInitializing = false;
      });
    };
    keycloak.onAuthError = error => {
      const message = (error && error.error_description)?error.error_description:"Failed to authenticate";
      runInAction(() => {
        this.authError = message;
      });
    };
    keycloak.onTokenExpired = () => {
      keycloak
        .updateToken(30)
        .catch(() => runInAction(() => {
          this.authSuccess = false;
          this.isTokenExpired = true;
        }));
    };
    keycloak.init({ onLoad: "login-required", pkceMethod: "S256" }).catch(() => {
      runInAction(() => {
        this.isInitializing = false;
        this.authError = "Failed to initialize authentication";
      });
    });
  }

  async authenticate() {
    if (this.isInitializing || this.authSuccess) {
      return;
    }
    this.isLogout = false;
    this.isInitializing = true;
    this.authError = null;
    try {
      const { data } = await this.transportLayer.getSettings();
      const commit = data?.data.commit;
      const keycloakSettings =  data?.data?.keycloak;
      API.setSentry(data?.data?.sentryUrl);
      API.setMatomo(data?.data?.matomo);
      runInAction(() => {
        this.commit = commit;
      });
      if(keycloakSettings) {
        const keycloakScript = document.createElement("script");
        keycloakScript.src = `${keycloakSettings.url}/js/keycloak.js`;
        keycloakScript.async = true;
        keycloakSettings.url = "https://kg.ebrains.eu/foobar";
        document.head.appendChild(keycloakScript);
        keycloakScript.onload = () => {
          this.initializeKeycloak(keycloakSettings);
        };
        keycloakScript.onerror = () => {
          document.head.removeChild(keycloakScript);
          runInAction(() => {
            this.isInitializing = false;
            this.authError = `Failed to load resource! (${keycloakScript.src})`;
          });
        };
      } else {
        runInAction(() => {
          this.isInitializing = false;
          this.authError = "The service is temporary unavailable. Please retry in a moment. (failed to load keycloak settings)";
        });
      }
    } catch (e) {
      runInAction(() => {
        this.isInitializing = false;
        this.authError = `The service is temporary unavailable. Please retry in a moment. (${e.message?e.message:e})`;
      });
    }
  }
}

export default AuthStore;

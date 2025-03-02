/*
 * Copyright 2020 EPFL/Human Brain Project PCO
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package eu.ebrains.kg.querybuilder.api;

import eu.ebrains.kg.querybuilder.constants.Constants;
import eu.ebrains.kg.querybuilder.model.KGCoreResult;
import eu.ebrains.kg.querybuilder.service.AuthClient;
import io.swagger.v3.oas.annotations.Operation;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RequestMapping(Constants.ROOT_PATH_OF_API + "/settings")
@RestController
public class Settings {

    private final AuthClient authClient;

    public Settings(AuthClient authClient) {
        this.authClient = authClient;
    }

    @Operation(summary = "Get settings")
    @GetMapping
    public ResponseEntity getSettings(
            @Value("${eu.ebrains.kg.commit}") String commit,
            @Value("${keycloak.realm}") String keycloakRealm ,
            @Value("${keycloak.resource}") String keycloakClientId,
            @Value("${sentry.dsn.ui}") String sentryDsnUi,
            @Value("${sentry.environment}") String sentryEnvironment,
            @Value("${matomo.url}") String matomoUrl,
            @Value("${matomo.siteId}") String matomoSiteId
    ) {
        String authEndpoint = authClient.getEndpoint();
        if (StringUtils.isNotBlank(authEndpoint)) {
            KGCoreResult.Single result = new KGCoreResult.Single();
            Map<String, Object> settings = new HashMap<>();
            settings.put("keycloak", Map.of(
                    "realm", keycloakRealm,
                    "url", authEndpoint,
                    "clientId", keycloakClientId
            ));
            if(StringUtils.isNotBlank(commit) && !commit.equals("\"\"")) {
                settings.put("commit", commit);

                // Only provide sentry when commit is available, ie on deployed env
                if (StringUtils.isNotBlank(sentryDsnUi)) {
                    settings.put("sentry", Map.of(
                            "dsn", sentryDsnUi,
                            "release", commit,
                            "environment", sentryEnvironment
                    ));
                }
            }
            if (StringUtils.isNotBlank(matomoUrl) && StringUtils.isNotBlank(matomoSiteId)) {
                settings.put("matomo", Map.of(
                        "url", matomoUrl,
                        "siteId", matomoSiteId
                ));
            }
            result.setData(settings);
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).build();
    }
}

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

import { Type } from "../Type";
export namespace QuerySpecification {

  export interface AbstractSchema extends Type.Property {
    attributeNamespace?: string;
  }

  export interface Schema extends AbstractSchema {
    id: string;
  }

  export interface CombinedSchema extends AbstractSchema {
    isUnknown: boolean;
  }

  export interface FilterItem {
    op?: string;
    parameter?: string;
    value?: string;
  }

  export interface Field {
    propertyName?: string;
    structure?: Field | Field[];
    path: Path | string | (Path | string)[];
    required?: boolean;
    sort?: boolean;
    ensureOrder?: boolean;
    filter?: FilterItem;
    singleValue?: boolean;
    [any: string]: any;
  }

  export interface Meta {
    name?: string;
    description?: string;
    type?: string; //TODO: this shouldn't happen after we split QueryBuilderStore
    responseVocab?: string;
  }

  export interface JsonLd {
    "@id": string;
  }

  export interface JsonLdWithType extends JsonLd {
    "@type": string;
  }

  export interface Path extends JsonLd {
    reverse?: boolean;
    typeFilter?: TypeFilter | TypeFilter[];
  }

  export interface TypeFilter extends JsonLd {} 

  export enum FilterOperation {
    IS_EMPTY = "IS_EMPTY",
    STARTS_WITH = "STARTS_WITH",
    ENDS_WITH = "ENDS_WITH",
    CONTAINS = "CONTAINS",
    EQUALS = "EQUALS",
    REGEX = "REGEX"
  }

  export interface ValueFilter {
    op: FilterOperation;
    parameter?: string;
    value?: string;
  }

  export enum SingleItemStrategy {
    FIRST = "FIRST",
    CONCAT = "CONCAT"
  }

  export interface Context {
    "@vocab": string;
    query?: string;
    propertyName: JsonLdWithType;
    path: JsonLdWithType;
    [index: string]: any;
  }

  export interface JSONQuerySpecification {
    "@id"?: string;
    "@context"?: Context;
    meta: Meta;
    space?: string;
    structure?: Field[];
    [name: string]: any;
  }
}

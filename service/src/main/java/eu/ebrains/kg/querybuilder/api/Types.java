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
import eu.ebrains.kg.querybuilder.service.TypeClient;
import eu.ebrains.kg.querybuilder.model.TypeEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping(Constants.ROOT_PATH_OF_API + "/types")
@RestController
public class Types {

    private final TypeClient typeClient;

    public Types(TypeClient typeClient) {
        this.typeClient = typeClient;
    }

    @GetMapping
    public List<TypeEntity> getTypes() {
        return typeClient.getTypes();
    }

    @PostMapping
    public Map<?, ?> getTypesByName(@RequestBody List<String> types) {
        return typeClient.getTypesByName(types);
    }

}
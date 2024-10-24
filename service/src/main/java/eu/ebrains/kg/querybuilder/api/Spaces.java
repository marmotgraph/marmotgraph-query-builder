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
import eu.ebrains.kg.querybuilder.service.SpaceClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RequestMapping(Constants.ROOT_PATH_OF_API + "/spaces")
@RestController
public class Spaces {

    private final SpaceClient spaceClient;

    public Spaces(SpaceClient spaceClient) {
        this.spaceClient = spaceClient;
    }

    @GetMapping
    public Map<?, ?> getSpaces() {
        return spaceClient.getSpaces();
    }
}

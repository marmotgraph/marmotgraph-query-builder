package eu.ebrains.kg.querybuilder.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.function.RequestPredicate;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import java.util.Arrays;
import java.util.List;

import static org.springframework.web.servlet.function.RequestPredicates.path;
import static org.springframework.web.servlet.function.RequestPredicates.pathExtension;
import static org.springframework.web.servlet.function.RouterFunctions.route;

@Configuration
public class SPARouting {

    @Bean
    RouterFunction<ServerResponse> spaRouter(@Value("${org.marmotgraph.api.root:}") String apiRoot) {
        ClassPathResource index = new ClassPathResource("public/index.html");
        List<String> extensions = Arrays.asList("js", "css", "ico", "png", "jpg", "gif", "html", "svg");
        RequestPredicate spaPredicate = path(apiRoot + "/**").or(path("/error")).or(pathExtension(extensions::contains)).negate();
        return route(spaPredicate, request -> ServerResponse.ok().contentType(MediaType.TEXT_HTML).body(index));
    }
}

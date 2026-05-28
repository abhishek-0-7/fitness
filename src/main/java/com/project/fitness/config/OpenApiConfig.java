package com.project.fitness.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Fitness Tracker API")
                        .version("v1.0")
                        .description("Backend API for Fitness Tracking Application")
                        .contact(new Contact()
                                .name("Send email to Abhishek Dey")
                                .email("abhid07d@gmail.com")
                        )
                );
    }
}
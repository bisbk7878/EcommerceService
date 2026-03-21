package com.ecommerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * APP CONFIG
 *
 * Registers shared Spring beans.
 *
 * RestTemplate is Spring's built-in HTTP client.
 * Declaring it as a @Bean lets Spring inject it anywhere via @Autowired or constructor injection.
 * DataSeeder uses it to call the DummyJSON API on startup.
 */
@Configuration
public class AppConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

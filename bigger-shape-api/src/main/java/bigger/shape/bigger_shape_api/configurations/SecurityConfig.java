package bigger.shape.bigger_shape_api.configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import bigger.shape.bigger_shape_api.filters.JwtAuthenticationFilter;
import bigger.shape.bigger_shape_api.services.JwtVerifierService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtVerifierService jwtVerifierService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/public/**").permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(new JwtAuthenticationFilter(jwtVerifierService),
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
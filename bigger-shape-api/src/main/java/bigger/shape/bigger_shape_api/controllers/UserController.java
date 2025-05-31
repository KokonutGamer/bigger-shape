package bigger.shape.bigger_shape_api.controllers;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping("${api.endpoint}/auth")
public class UserController {

    private final Logger logger;

    public UserController() {
        this.logger = LoggerFactory.getLogger(UserController.class);
    }

    @GetMapping("/users")
    public Map<String, Object> me(Authentication authentication) {
        Claims claims = (Claims) authentication.getPrincipal();
        logger.info("userId: {}", claims.get("sub").toString());
        return Map.of(
                "userId", claims.get("sub"),
                "email", claims.get("email"),
                "role", claims.get("role"));
    }
}

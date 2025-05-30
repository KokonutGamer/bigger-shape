package bigger.shape.bigger_shape_api.controllers;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bigger.shape.bigger_shape_api.entities.User;

@RestController
@RequestMapping("${api.endpoint}")
public class UserController {

    @GetMapping("/users")
    public List<User> me(Authentication authentication) {
        return null;
    }
}

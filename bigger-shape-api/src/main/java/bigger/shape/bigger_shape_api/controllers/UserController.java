package bigger.shape.bigger_shape_api.controllers;

import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bigger.shape.bigger_shape_api.dtos.QuestionnaireHistoryEntryDto;
import bigger.shape.bigger_shape_api.services.UserService;
import io.jsonwebtoken.Claims;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("${api.endpoint}/auth")
public class UserController {

    private final UserService userService;
    private final Logger logger;

    public UserController(UserService userService) {
        this.userService = userService;
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

    /**
     * Stores a new questionnaire result for the authenticated user.
     * 
     * @param authentication         the authentication object containing user
     *                               credentials and claims
     * @param questionnaireResultDto the questionnaire result data to be stored
     * @return a {@link ResponseEntity} indicating the outcome of the operation
     */
    @PostMapping("/users/history")
    public ResponseEntity<?> addQuestionnaireResult(Authentication authentication,
            @RequestBody QuestionnaireHistoryEntryDto questionnaireResultDto) {

        Claims claims = (Claims) authentication.getPrincipal();
        UUID id = UUID.fromString(claims.getSubject());

        userService.saveQuestionnaireHistoryEntry(id, questionnaireResultDto);

        return ResponseEntity.ok().build();
    }

}

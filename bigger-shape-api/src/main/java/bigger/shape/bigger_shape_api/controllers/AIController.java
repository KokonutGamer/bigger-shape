package bigger.shape.bigger_shape_api.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bigger.shape.bigger_shape_api.dtos.SubmissionRequestBodyDto;
import bigger.shape.bigger_shape_api.responses.RecommendationsResponse;
import bigger.shape.bigger_shape_api.services.OpenAIService;
import bigger.shape.bigger_shape_api.services.QuestionnaireService;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("${api.endpoint}/public/ai")
public class AIController {

    private final OpenAIService openAIService;
    private final QuestionnaireService questionnaireService;

    public AIController(OpenAIService openAIService, QuestionnaireService questionnaireService) {
        this.openAIService = openAIService;
        this.questionnaireService = questionnaireService;
    }

    @GetMapping("/random")
    public String getRandomResponse() {
        return openAIService.random();
    }

    // TODO refactor
    @PostMapping("/risk-analysis")
    public Object getRiskScoreAndDescription(@RequestBody SubmissionRequestBodyDto dto) {
        RecommendationsResponse recommendations = questionnaireService.processAnswersAndGetRecommendations(dto);
        Mono<Map<String, String>> response = openAIService.analyzeRisk(recommendations);
        return ResponseEntity.ok(response);
    }
}

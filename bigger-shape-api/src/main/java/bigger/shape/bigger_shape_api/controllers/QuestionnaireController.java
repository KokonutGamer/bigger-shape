package bigger.shape.bigger_shape_api.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bigger.shape.bigger_shape_api.responses.GetQuestionsResponse;
import bigger.shape.bigger_shape_api.services.QuestionnaireService;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
/**
 * MIGHT HAVE TO PUT CORS HERE - not sure about it
 * 
 * @CrossOrigin(origins = "http://localhost:_____")
 */

@RequestMapping("/api/v1")
public class QuestionnaireController {
  private final QuestionnaireService questionnaireService;

  public QuestionnaireController(QuestionnaireService questionnaireService) {
    this.questionnaireService = questionnaireService;
  }

  /**
   * Endpoint to get all questions from the questionnaire.
   * 
   * Test on: "http://localhost:8080/api/v1/public/questions"
   * 
   * @return ResponseEntity containing GetQuestionsResponse with all questions.
   */
  @GetMapping("/public/questions")
  ResponseEntity<GetQuestionsResponse> getQuestions() {
    GetQuestionsResponse result = new GetQuestionsResponse(
        questionnaireService.getAllQuestionsAsDtos());
    return ResponseEntity.ok(result);
  }

}

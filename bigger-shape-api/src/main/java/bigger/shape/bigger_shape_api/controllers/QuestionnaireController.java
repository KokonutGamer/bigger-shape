package bigger.shape.bigger_shape_api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bigger.shape.bigger_shape_api.dtos.SubmissionRequestBodyDto;
import bigger.shape.bigger_shape_api.responses.GetQuestionsResponse;
import bigger.shape.bigger_shape_api.responses.RecommendationsResponse;
import bigger.shape.bigger_shape_api.services.QuestionnaireService;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1")
public class QuestionnaireController {
  @Autowired
  QuestionnaireService questionnaireService;

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

  /**
   * Endpoint recieves questions and answers to the questionnaire
   * and sends back reponse with appropriate list of recommendations
   * 
   * 
   * Test on: "http://localhost:8080/api/v1/public/submit-answers"
   * 
   * @param request
   * @return
   */
  @PostMapping("/public/submit-answers")
  public ResponseEntity<RecommendationsResponse> submitAnswersAndGetRecommendations(
      @RequestBody SubmissionRequestBodyDto request) {
        RecommendationsResponse response = questionnaireService.processAnswersAndGetRecommendations(request);
    return ResponseEntity.ok(response);
  }
}

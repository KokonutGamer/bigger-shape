package bigger.shape.bigger_shape_api.dtos;

import lombok.Data;

@Data
public class SubmittedAnswerDto {
  private String questionId;
  private String answer;

  public SubmittedAnswerDto(String questionId, String answer) {
    this.questionId = questionId;
    this.answer = answer;
  }
}

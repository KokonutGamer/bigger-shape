package bigger.shape.bigger_shape_api.dtos;

import java.util.List;

import lombok.Data;

@Data
public class SubmissionRequestBodyDto {
  private List<SubmittedAnswerDto> answers;

  public SubmissionRequestBodyDto(List<SubmittedAnswerDto> answers) {
    this.answers = answers;
  }
}


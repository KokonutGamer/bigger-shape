package bigger.shape.bigger_shape_api.dtos;

import java.util.List;

import lombok.Data;

@Data
public class QuestionnaireHistoryEntryDto {
    private QuestionnaireResultDto questionnaire;
    private List<AnswerRecommendationDto> answers;
}

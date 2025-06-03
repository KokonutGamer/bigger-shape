package bigger.shape.bigger_shape_api.dtos;

import java.util.ArrayList;
import java.util.List;

import bigger.shape.bigger_shape_api.entities.QuestionnaireResult;
import lombok.Data;
import lombok.NonNull;

@Data
public class QuestionnaireHistoryEntryDto {
    @NonNull
    private QuestionnaireResultDto questionnaire;
    private List<AnswerRecommendationDto> answers;

    public static QuestionnaireHistoryEntryDto fromQustionnaireResultEntity(QuestionnaireResult result) {
        QuestionnaireHistoryEntryDto dto = new QuestionnaireHistoryEntryDto(
                new QuestionnaireResultDto(result.getDateTaken(), result.getRiskScore()));
        dto.setAnswers(new ArrayList<>());
        return dto;
    }
}

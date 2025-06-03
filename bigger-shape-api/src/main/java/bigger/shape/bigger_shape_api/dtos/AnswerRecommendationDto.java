package bigger.shape.bigger_shape_api.dtos;

import java.util.List;

import lombok.Data;

@Data
public class AnswerRecommendationDto {
    private AnswerDto answer;
    private List<RecommendationDto> recommendations;
}

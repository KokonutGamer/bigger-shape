package bigger.shape.bigger_shape_api.responses;

import java.util.List;

import bigger.shape.bigger_shape_api.dtos.QuestionsDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetQuestionsResponse {
    private List<QuestionsDto> questions;
}
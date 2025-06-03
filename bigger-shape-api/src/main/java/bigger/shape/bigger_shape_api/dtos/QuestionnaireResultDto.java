package bigger.shape.bigger_shape_api.dtos;

import java.time.OffsetDateTime;

import lombok.Data;

@Data
public class QuestionnaireResultDto {
    private OffsetDateTime dateTaken;
    private String riskScore;
}

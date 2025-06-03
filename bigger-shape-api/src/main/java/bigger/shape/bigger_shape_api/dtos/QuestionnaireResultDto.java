package bigger.shape.bigger_shape_api.dtos;

import java.time.OffsetDateTime;

import lombok.Data;
import lombok.NonNull;

@Data
public class QuestionnaireResultDto {

    @NonNull
    private OffsetDateTime dateTaken;

    @NonNull
    private String riskScore;
}

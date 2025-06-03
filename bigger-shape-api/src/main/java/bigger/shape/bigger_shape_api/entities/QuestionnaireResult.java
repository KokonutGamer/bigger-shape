package bigger.shape.bigger_shape_api.entities;

import java.time.OffsetDateTime;
import java.util.UUID;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "questionnaire_result")
public class QuestionnaireResult {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "date_taken", columnDefinition = "timestamptz")
    private OffsetDateTime dateTaken; 

    @Column(name = "risk_score")
    private String riskScore;

    @ManyToOne
    @JoinColumn(name = "user_ID")
    @NonNull 
    private User user;

}

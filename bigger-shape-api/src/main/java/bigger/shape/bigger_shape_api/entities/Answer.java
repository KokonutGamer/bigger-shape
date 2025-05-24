package bigger.shape.bigger_shape_api.entities;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "Answer")
public class Answer {

  @EmbeddedId
  private AnswerId id;

  @NonNull
  @Column(name = "answer_content")
  private String answerContent;

  @ManyToOne
  @MapsId("questionnaireId") // Maps questionnaireId from AnswerId
  @JoinColumn(name = "questionnaire_id")
  private QuestionnaireResult questionnaireResult;

  @ManyToOne
  @MapsId("riskFactorId") // Maps riskFactorId from AnswerId
  @JoinColumn(name = "risk_factor_id")
  private RiskFactor riskFactor;
}
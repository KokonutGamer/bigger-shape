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
@Table(name = "question_option")
public class QuestionOption {

  @EmbeddedId
  private QuestionOptionId id;

  @ManyToOne
  @MapsId("questionId")
  @JoinColumn(name = "question_id", nullable = false)
  private Question question;

  @NonNull
  @Column(name="content", nullable= false)
  private String content;
}

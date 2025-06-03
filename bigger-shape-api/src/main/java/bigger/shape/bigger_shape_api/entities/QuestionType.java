package bigger.shape.bigger_shape_api.entities;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "question_type")
public class QuestionType {

  @Id
  @Column(name = "id")
  private String id;

  @NonNull
  @Column(name = "name")
  private String name;

}

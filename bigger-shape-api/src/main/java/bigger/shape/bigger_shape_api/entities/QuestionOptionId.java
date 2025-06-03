package bigger.shape.bigger_shape_api.entities;

import java.io.Serializable;
import java.util.UUID;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/* *
 * Composite key class for QuestionOption entity
 */
@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class QuestionOptionId implements Serializable{
  private UUID questionId;
  private Long order;
}
package bigger.shape.bigger_shape_api.entities;

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
@Table(name = "Risk_Factor")
public class RiskFactor {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @NonNull
    @Column(name = "\"order\"")
    private String order;

    @ManyToOne
    @JoinColumn(name = "question_type_id", nullable = false)
    @NonNull
    private QuestionType questionType;

    @NonNull
    @Column(name = "question_content")
    private String questionContent;

}

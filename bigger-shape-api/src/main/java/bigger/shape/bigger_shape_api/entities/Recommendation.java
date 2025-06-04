package bigger.shape.bigger_shape_api.entities;

import io.micrometer.common.lang.NonNull;
import jakarta.annotation.Nonnull;
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
@Table(name = "recommendation")
public class Recommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    @NonNull
    private Question question;

    @NonNull
    @Column(name="name")
    private String name;

    @NonNull
    @Column(name="description")
    private String description;

    @NonNull
    @Column(name = "website_url")
    private String websiteUrl;

    @NonNull
    @Column(name = "contact_url")
    private String contactUrl;

}

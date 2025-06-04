package bigger.shape.bigger_shape_api.repositories;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import bigger.shape.bigger_shape_api.entities.Answer;
import bigger.shape.bigger_shape_api.entities.AnswerId;

public interface AnswerRepository extends JpaRepository<Answer, AnswerId> {

    @Query("""
            SELECT a FROM Answer a
                JOIN a.questionnaireResult qr
            WHERE qr.user.id = :userId AND qr.dateTaken = :dateTaken AND qr.riskScore = :riskScore
            """)
    public List<Answer> findAllAnswersByIdDateScore(@Param("userId") UUID userId,
            @Param("dateTaken") OffsetDateTime dateTaken, @Param("riskScore") String riskScore);
}

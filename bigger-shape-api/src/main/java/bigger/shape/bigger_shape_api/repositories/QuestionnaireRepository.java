package bigger.shape.bigger_shape_api.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import bigger.shape.bigger_shape_api.entities.QuestionnaireResult;

public interface QuestionnaireRepository extends JpaRepository<QuestionnaireResult, UUID> {

    @Query("SELECT qr FROM QuestionnaireResult qr WHERE qr.user.id = :id")
    public List<QuestionnaireResult> findAllQuestionnaireResultsById(@Param("id") UUID id);
}

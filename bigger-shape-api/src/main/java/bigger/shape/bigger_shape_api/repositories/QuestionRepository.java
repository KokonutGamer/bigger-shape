package bigger.shape.bigger_shape_api.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import bigger.shape.bigger_shape_api.entities.Question;

public interface QuestionRepository extends JpaRepository<Question, UUID> {

  /**
   * Grabbing all questions from the database to display in the questionnaire.
   * 
   * @return the order of the questions, their type, and content.
   */
  public List<Question> findAllByOrderByOrderAsc();

  /**
   * Find the UUID of a Question based on the order it appears in. The order a
   * Question appears in is guaranteed to be unique.
   * 
   * @param order The order a Question appears in the Questionnaire.
   * @return The UUID associated with this Question.
   */
  @Query("SELECT q.id FROM Question q WHERE q.order = :order")
  public UUID findIdByOrder(@Param("order") Long order);
}

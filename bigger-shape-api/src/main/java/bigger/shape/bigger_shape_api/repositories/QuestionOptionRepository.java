package bigger.shape.bigger_shape_api.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import bigger.shape.bigger_shape_api.entities.QuestionOption;
import bigger.shape.bigger_shape_api.entities.QuestionOptionId;

public interface QuestionOptionRepository extends JpaRepository<QuestionOption, QuestionOptionId> {

	/**
	 * Finds all question options for a given list of question IDs,
	 * ordered by the 'order' field within each question's options.
	 * 
	 * @param questionIds the list of question IDs to find options for
	 * @return a list of QuestionOption entities ordered by their 'order' field.
	 */
	List<QuestionOption> findByQuestion_IdInOrderById_OrderAsc(List<UUID> questionIds);

	@Query("""
			SELECT qo.id.order
			FROM Answer a
				JOIN a.question q
				JOIN QuestionOption qo ON qo.question = q
			WHERE q.order = :questionOrder AND :answerContent LIKE qo.content
			      """)
	public Long findQuestionOptionOrderByAnswer(@Param("questionOrder") Long questionOrder, @Param("answerContent") String answerContent);
}

package bigger.shape.bigger_shape_api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import bigger.shape.bigger_shape_api.entities.Answer;
import bigger.shape.bigger_shape_api.entities.AnswerId;

public interface AnswerRepository extends JpaRepository<Answer, AnswerId> {
}

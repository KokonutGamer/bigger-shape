package bigger.shape.bigger_shape_api.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import bigger.shape.bigger_shape_api.dtos.AnswerDto;
import bigger.shape.bigger_shape_api.dtos.QuestionnaireHistoryEntryDto;
import bigger.shape.bigger_shape_api.entities.Answer;
import bigger.shape.bigger_shape_api.entities.AnswerId;
import bigger.shape.bigger_shape_api.entities.QuestionnaireResult;
import bigger.shape.bigger_shape_api.entities.User;
import bigger.shape.bigger_shape_api.repositories.AnswerRepository;
import bigger.shape.bigger_shape_api.repositories.QuestionRepository;
import bigger.shape.bigger_shape_api.repositories.QuestionnaireRepository;
import bigger.shape.bigger_shape_api.repositories.UserRepository;
import jakarta.transaction.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final QuestionnaireRepository questionnaireRepository;
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;

    public UserService(UserRepository userRepository, QuestionnaireRepository questionnaireRepository,
            AnswerRepository answerRepository, QuestionRepository questionRepository) {
        this.userRepository = userRepository;
        this.questionnaireRepository = questionnaireRepository;
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
    }

    public List<QuestionnaireHistoryEntryDto> getQuestionnaireHistory(UUID id) {
        List<QuestionnaireResult> history = questionnaireRepository.findAllQuestionnaireResultsById(id);
        return history.stream()
                .map(QuestionnaireHistoryEntryDto::fromQuestionnaireResultEntity)
                .toList();
    }

    @Transactional
    public void saveQuestionnaireHistoryEntry(UUID id, QuestionnaireHistoryEntryDto dto) {
        // Check if the user exists
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Create the QuestionnaireResult entity
        QuestionnaireResult result = new QuestionnaireResult();
        result.setUser(user);
        result.setDateTaken(dto.getQuestionnaire().getDateTaken());
        result.setRiskScore(dto.getQuestionnaire().getRiskScore());

        // Save the result
        result = questionnaireRepository.save(result);

        // Save answers if they exist
        if (!dto.getAnswers().isEmpty()) {
            for (AnswerDto answerDto : dto.getAnswers()) {

                // Set the AnswerId for the Answer entity
                AnswerId answerId = new AnswerId();
                UUID questionId = questionRepository.findIdByOrder(answerDto.getQuestionOrder());
                answerId.setQuestionId(questionId);
                answerId.setQuestionnaireId(result.getId());

                // Create the Answer entity
                Answer answer = new Answer();
                answer.setId(answerId);
                answer.setAnswerContent(answerDto.getAnswerContent());
                answer.setQuestionnaireResult(result);
                answer.setQuestion(questionRepository.findById(questionId).get());

                // Save the new Answer into the database
                answerRepository.save(answer);
            }
        }
    }
}

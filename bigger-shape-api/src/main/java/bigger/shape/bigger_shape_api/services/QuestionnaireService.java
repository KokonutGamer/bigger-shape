package bigger.shape.bigger_shape_api.services;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bigger.shape.bigger_shape_api.dtos.QuestionsDto;
import bigger.shape.bigger_shape_api.entities.Question;
import bigger.shape.bigger_shape_api.entities.QuestionOption;
import bigger.shape.bigger_shape_api.repositories.QuestionOptionRepository;
import bigger.shape.bigger_shape_api.repositories.QuestionRepository;

@Service
public class QuestionnaireService {
  @Autowired
  private QuestionRepository questionRepository;

  @Autowired
  private QuestionOptionRepository questionOptionRepository;

  public List<QuestionsDto> getAllQuestionsAsDtos() {
    List<Question> questions = questionRepository.findAllByOrderByOrderAsc();

    if (questions.isEmpty()) {
      return Collections.emptyList();
    }

    List<UUID> questionIds = questions.stream()
        .map(Question::getId)
        .collect(Collectors.toList());

    List<QuestionOption> questionOptions = questionOptionRepository.findByQuestion_IdInOrderById_OrderAsc(questionIds);

    Map<UUID, List<QuestionOption>> optionsByQuestionId = questionOptions.stream()
        .collect(Collectors.groupingBy(option -> option.getQuestion().getId()));

    return questions.stream()
        .map(question -> {
          List<QuestionOption> options = optionsByQuestionId.getOrDefault(question.getId(), Collections.emptyList());
          List<String> optionContents = options.stream()
              .map(QuestionOption::getContent)
              .collect(Collectors.toList());

          return new QuestionsDto(
              question.getQuestionType().getName(),
              question.getId().toString(),
              question.getContent(),
              optionContents);
        })
        .collect(Collectors.toList());
  }

}
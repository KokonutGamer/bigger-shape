package bigger.shape.bigger_shape_api.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import bigger.shape.bigger_shape_api.dtos.QuestionsDto;
import bigger.shape.bigger_shape_api.dtos.RecommendationDto;
import bigger.shape.bigger_shape_api.dtos.SubmissionRequestBodyDto;
import bigger.shape.bigger_shape_api.dtos.SubmittedAnswerDto;
import bigger.shape.bigger_shape_api.entities.Question;
import bigger.shape.bigger_shape_api.entities.QuestionOption;
import bigger.shape.bigger_shape_api.entities.Recommendation;
import bigger.shape.bigger_shape_api.repositories.QuestionOptionRepository;
import bigger.shape.bigger_shape_api.repositories.QuestionRepository;
import bigger.shape.bigger_shape_api.repositories.RecommendationRepository;
import bigger.shape.bigger_shape_api.responses.RecommendationsResponse;

@Service
public class QuestionnaireService {

	private final QuestionRepository questionRepository;
	private final QuestionOptionRepository questionOptionRepository;
	private final RecommendationRepository recommendationRepository;
	private final Map<String, Set<Integer>> acceptableAnswers;

	public QuestionnaireService(QuestionRepository questionRepository,
			QuestionOptionRepository questionOptionRepository,
			RecommendationRepository recommendationRepository) {
		this.questionRepository = questionRepository;
		this.questionOptionRepository = questionOptionRepository;
		this.recommendationRepository = recommendationRepository;

		// Acceptable answers
		this.acceptableAnswers = new HashMap<>();

		// Monthly rent
		acceptableAnswers.put("068967bf-3f28-4306-ac07-688c29efc3f8", Set.of(5, 6, 7));

		// Disability status
		acceptableAnswers.put("2109f4b9-50f9-46f3-bebd-deb6351adb64", Set.of(3));

		// Age Range
		acceptableAnswers.put("32cd1863-adc4-4a08-81f3-cc53ef630607", Set.of(1, 2, 3, 4));

		// Income Range
		acceptableAnswers.put("494be9d4-2a36-4868-b120-b1c7e6542cb8", Set.of(5, 6, 7, 8));

		// Number of dependents
		acceptableAnswers.put("5b36db85-7954-4c3c-bedc-2d24217d04d0", Set.of(3, 4, 5));

		// Monthly additional spending
		acceptableAnswers.put("8d651497-48de-450d-93ec-64506b9e9563", Set.of(1, 2, 3, 4));

		// Zip code
		acceptableAnswers.put("9e3efa78-7bf8-4b88-b93e-715454583779", Set.of(1, 2, 3, 4, 5, 6, 7));

		// Average drinks per week
		acceptableAnswers.put("b8eaec80-6f95-4246-b775-5e684a236f04", Set.of(1, 2));

		// Family availability
		acceptableAnswers.put("ca7e7d4d-3406-4684-b049-2adb96678815", Set.of(1));

		// Monthly food cost
		acceptableAnswers.put("fa35c3c1-26ae-430d-aacd-128da6388060", Set.of(1, 2, 3, 4));
	}

	public List<QuestionsDto> getAllQuestionsAsDtos() {
		List<Question> questions = questionRepository.findAllByOrderByOrderAsc();

		if (questions.isEmpty()) {
			return Collections.emptyList();
		}

		List<UUID> questionIds = questions.stream()
				.map(Question::getId)
				.collect(Collectors.toList());

		List<QuestionOption> questionOptions = questionOptionRepository
				.findByQuestion_IdInOrderById_OrderAsc(questionIds);

		Map<UUID, List<QuestionOption>> optionsByQuestionId = questionOptions.stream()
				.collect(Collectors.groupingBy(option -> option.getQuestion().getId()));

		return questions.stream()
				.map(question -> {
					List<QuestionOption> options = optionsByQuestionId.getOrDefault(question.getId(),
							Collections.emptyList());
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

	/**
	 * Processes the answers submitted by the user and returns a list of
	 * recommendations.
	 * If the answers are not in the pool of answers, then they indicate that the
	 * user is
	 * struggling and needs to resources linked to the question.
	 * 
	 * @param SubmissionRequestBodyDto The request containing the user's answers.
	 * @return RecommendationsResponse containing a list of recommendations based on
	 *         the user's answers.
	 */
	public RecommendationsResponse processAnswersAndGetRecommendations(
			SubmissionRequestBodyDto answerSubmissionRequest) {

		// what im sending back
		Set<RecommendationDto> recommendationsToReturn = new HashSet<>();

		// Retrieving all the recommendations
		List<Recommendation> databaseRecommendations = recommendationRepository.findAllByOrderByIdAsc();

		List<SubmittedAnswerDto> questionAndAnswerPairs = answerSubmissionRequest.getAnswers();

		if (questionAndAnswerPairs != null && !questionAndAnswerPairs.isEmpty()) {
			for (SubmittedAnswerDto pair : questionAndAnswerPairs) {
				String questionId = pair.getQuestionId();
				String answerString = pair.getAnswer();

				// if user's answer is unnacceptable add to recommendations
				if (!acceptableAnswers.get(questionId).contains(Integer.valueOf(answerString))) {
					List<RecommendationDto> dtosForThisQuestion = databaseRecommendations.stream()
							.filter(rec -> {
								if (rec.getQuestion() != null && rec.getQuestion().getId() != null) {
									return rec.getQuestion().getId().toString().equals(questionId);
								}
								return false;
							})
							.map(recEntity -> new RecommendationDto(
									recEntity.getQuestion().getId().toString(),
									recEntity.getName(),
									recEntity.getDescription(),
									recEntity.getWebsiteUrl(),
									recEntity.getContactUrl()))
							.collect(Collectors.toList());

					recommendationsToReturn.addAll(dtosForThisQuestion);
				}
			}
		}
		return new RecommendationsResponse(new ArrayList<>(recommendationsToReturn));
	}

}
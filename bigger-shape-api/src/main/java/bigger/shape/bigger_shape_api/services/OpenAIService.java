package bigger.shape.bigger_shape_api.services;

import java.util.List;
import java.util.UUID;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.ResponseFormat;
import org.springframework.stereotype.Service;

import bigger.shape.bigger_shape_api.entities.Question;
import bigger.shape.bigger_shape_api.repositories.QuestionRepository;
import bigger.shape.bigger_shape_api.responses.RecommendationsResponse;

@Service
public class OpenAIService {

	private final QuestionRepository questionRepository;

	private final ChatClient chatClient;
	private final String systemMessageText;
	private final String jsonSchema;

	public OpenAIService(ChatClient.Builder chatClientBuilder, QuestionRepository questionRepository) {
		this.chatClient = chatClientBuilder.build();
		this.questionRepository = questionRepository;
		this.systemMessageText = """
				You are a social worker. You just finished assessing a person
				via an online survey with questions related to homelessness
				risk factors. You find that they scored low on certain
				questions which relate to certain risk factors. Generate the
				"message" in second person point of view.

				The client will send to you a message containing bulleted items
				for each risk factor and each recommended resource. **Provide a
				description for each bullet item**. At the end, assess their
				risk score from 0 out of 10 to 10 out of 10, including
				decimals, where 0 is no risk of homelessness and 10 is
				critically high risk of being homeless. **In the riskScore,
				provide the number that is out of 10. Do not include "out of
				10". This must match what you said in the "message"**. Include
				at least one summarizing sentence for each risk factor and
				unique recommended resource.
				""";

		this.jsonSchema = """
				{
				    "type": "object",
				    "properties": {
				        "message": {
				            "type": "string",
				            "description": "A summary message"
				        },
				        "riskScore": {
				            "type": "number",
				            "description": "Risk level between 0 and 10"
				        }
				    },
				    "required": [
				        "message",
				        "riskScore"
				    ],
					"additionalProperties": false
				}
				    """;
	}

	public String random() {
		return this.chatClient.prompt()
				.user("Generate a random message. This can be a joke, quote, or riddle with answer.")
				.call()
				.content();
	}

	public String analyzeUserSubmissionRisk(RecommendationsResponse recommendations) {
		// Compiled client message with JSON from the submissions and recommendations
		StringBuilder userMessageBuilder = new StringBuilder(
				"Below is a mapping of a risk factor to a recommended resource to help them.");
		recommendations.getRecommendations().stream().forEach(dto -> {
			Question question = questionRepository.findById(UUID.fromString(dto.getQuestionId())).get();
			userMessageBuilder.append("\n - Risk factor: ")
					.append(question.getContent().replaceAll(":", "").toLowerCase());
			userMessageBuilder.append("\n  - Recommended resource: ").append(dto.getName()).append(": ")
					.append(dto.getDescription());
		});

		Message userMessage = new UserMessage(userMessageBuilder.toString());
		Message systemMessage = new SystemMessage(systemMessageText);
		OpenAiChatOptions options = OpenAiChatOptions.builder()
				.responseFormat(new ResponseFormat(ResponseFormat.Type.JSON_SCHEMA, jsonSchema)).build();
		Prompt prompt = new Prompt(List.of(systemMessage, userMessage), options);

		return this.chatClient.prompt(prompt).call().content();
	}

}

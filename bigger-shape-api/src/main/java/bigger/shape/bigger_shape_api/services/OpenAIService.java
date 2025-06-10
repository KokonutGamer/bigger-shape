package bigger.shape.bigger_shape_api.services;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.openai.client.OpenAIClientAsync;
import com.openai.client.okhttp.OpenAIOkHttpClientAsync;
import com.openai.core.JsonValue;
import com.openai.models.ChatModel;
import com.openai.models.FunctionDefinition;
import com.openai.models.FunctionParameters;
import com.openai.models.chat.completions.ChatCompletionCreateParams;
import com.openai.models.chat.completions.ChatCompletionTool;

import bigger.shape.bigger_shape_api.entities.Question;
import bigger.shape.bigger_shape_api.repositories.QuestionRepository;
import bigger.shape.bigger_shape_api.responses.RecommendationsResponse;
import reactor.core.publisher.Mono;

@Service
public class OpenAIService {

    private final QuestionRepository questionRepository;
    private final OpenAIClientAsync client;

    private final ChatClient chatClient;
    private final String systemMessage;

    public OpenAIService(ChatClient.Builder chatClientBuilder, QuestionRepository questionRepository,
            @Value("${openai.api.key}") String apiKey) {
        this.chatClient = chatClientBuilder.build();
        this.questionRepository = questionRepository;
        this.client = OpenAIOkHttpClientAsync.builder().apiKey(apiKey).build();
        this.systemMessage = """
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
    }

    public String random() {
        return this.chatClient.prompt()
                .user("Generate a random message. This can be a joke, quote, or riddle with answer.")
                .call()
                .content();
    }

    public Mono<Map<String, String>> analyzeRisk(RecommendationsResponse recommendations) {

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

        System.out.println(userMessageBuilder.toString());

        FunctionParameters functionParameters = FunctionParameters.builder()
                .putAdditionalProperty("type", JsonValue.from("object"))
                .putAdditionalProperty("properties", JsonValue.from(Map.of(
                        "message", Map.of(
                                "type", "string",
                                "description", "A summary message"),
                        "riskScore", Map.of(
                                "type", "number",
                                "description", "Risk level between 0 and 10"))))
                .putAdditionalProperty("required", JsonValue.from(List.of("message", "riskScore")))
                .build();

        FunctionDefinition functionDefinition = FunctionDefinition.builder()
                .name("analyze-submission-risk")
                .description("Analyzes a user's text input and returns a message and numeric risk score")
                .parameters(functionParameters)
                .build();

        ChatCompletionTool tool = ChatCompletionTool.builder()
                .function(functionDefinition)
                .build();

        ChatCompletionCreateParams params = ChatCompletionCreateParams.builder()
                .model(ChatModel.GPT_4_1)
                .maxCompletionTokens(2048)
                .temperature(1.2)
                .addTool(tool)
                .addSystemMessage(systemMessage)
                .addUserMessage(userMessageBuilder.toString())
                .build();

        this.client.chat().completions().create(params).thenAccept(completion -> completion.choices().stream()
                .flatMap(choice -> choice.message().content().stream()).forEach(System.out::println)).join();

        return null;
    }
}

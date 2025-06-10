package bigger.shape.bigger_shape_api.dtos;

import bigger.shape.bigger_shape_api.entities.Answer;
import lombok.Data;

@Data
public class AnswerDto {
    private Long questionOptionOrder;
    private String answerContent;
    private Long questionOrder;

    // DOES NOT MAP THE QUESTION OPTION ORDER - this must be done manually
    public static AnswerDto fromEntity(Answer answer) {
        AnswerDto result = new AnswerDto();
        result.setAnswerContent(answer.getAnswerContent());
        result.setQuestionOrder(answer.getQuestion().getOrder());
        return result;
    }
}

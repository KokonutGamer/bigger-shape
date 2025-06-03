package bigger.shape.bigger_shape_api.dtos;

import java.util.List;

import lombok.Data;

@Data
public class QuestionsDto {
  private String type;
  private String id;
  private String label;
  private List<String> options;

  public QuestionsDto(String type, String id, String label, List<String> options) {
        this.type = type;
        this.id = id;
        this.label = label;
        this.options = options;
    }
}
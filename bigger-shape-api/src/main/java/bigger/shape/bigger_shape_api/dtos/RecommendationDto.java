package bigger.shape.bigger_shape_api.dtos;

import lombok.Data;

@Data
public class RecommendationDto {
  private String questionId;
  private String name;
  private String description;
  private String websiteUrl;
  private String contactUrl;

  public RecommendationDto(String questionId, String name, String description, String websiteUrl, String contactUrl) {
    this.questionId = questionId;
    this.name = name;
    this.description = description;
    this.websiteUrl = websiteUrl;
    this.contactUrl = contactUrl;
  }
}

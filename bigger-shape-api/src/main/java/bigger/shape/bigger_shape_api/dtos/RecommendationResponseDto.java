package bigger.shape.bigger_shape_api.dtos;

import java.util.List;

import lombok.Data;

@Data
public class RecommendationResponseDto {
  private List<RecommendationDto> recommendations;

  public RecommendationResponseDto(List<RecommendationDto> recommendations) {
    this.recommendations = recommendations;
  }
}

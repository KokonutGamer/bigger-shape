package bigger.shape.bigger_shape_api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import bigger.shape.bigger_shape_api.entities.Recommendation;

public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
  
  /**
   * Return all the available reccomendations in the database. "Future" 
   * optimizations would have this query for recommendations based on
   * specific question IDs. But we're short on time and this works. 
   * 
   * @return a list of all recommendations in the database.
   */
  public List<Recommendation> findAllByOrderByIdAsc();
}

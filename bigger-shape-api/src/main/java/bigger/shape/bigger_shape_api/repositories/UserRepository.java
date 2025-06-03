package bigger.shape.bigger_shape_api.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import bigger.shape.bigger_shape_api.entities.User;

/**
 * This repository has no custom-defined methods for querying because we only
 * need this for verifying a User exists via the
 * {@link UserRepository#findById(UUID) findById} method.
 */
public interface UserRepository extends JpaRepository<User, UUID> {
}

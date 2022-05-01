package cm.ti.pharm.backend.repository;

import cm.ti.pharm.backend.domain.Disponibility;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Disponibility entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DisponibilityRepository extends JpaRepository<Disponibility, Long> {}

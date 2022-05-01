package cm.ti.pharm.backend.service;

import cm.ti.pharm.backend.domain.Disponibility;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Disponibility}.
 */
public interface DisponibilityService {
    /**
     * Save a disponibility.
     *
     * @param disponibility the entity to save.
     * @return the persisted entity.
     */
    Disponibility save(Disponibility disponibility);

    /**
     * Updates a disponibility.
     *
     * @param disponibility the entity to update.
     * @return the persisted entity.
     */
    Disponibility update(Disponibility disponibility);

    /**
     * Partially updates a disponibility.
     *
     * @param disponibility the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Disponibility> partialUpdate(Disponibility disponibility);

    /**
     * Get all the disponibilities.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Disponibility> findAll(Pageable pageable);

    /**
     * Get the "id" disponibility.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Disponibility> findOne(Long id);

    /**
     * Delete the "id" disponibility.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

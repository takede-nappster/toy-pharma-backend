package cm.ti.pharm.backend.service;

import cm.ti.pharm.backend.domain.Drug;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Drug}.
 */
public interface DrugService {
    /**
     * Save a drug.
     *
     * @param drug the entity to save.
     * @return the persisted entity.
     */
    Drug save(Drug drug);

    /**
     * Updates a drug.
     *
     * @param drug the entity to update.
     * @return the persisted entity.
     */
    Drug update(Drug drug);

    /**
     * Partially updates a drug.
     *
     * @param drug the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Drug> partialUpdate(Drug drug);

    /**
     * Get all the drugs.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Drug> findAll(Pageable pageable);

    /**
     * Get the "id" drug.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Drug> findOne(Long id);

    /**
     * Delete the "id" drug.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

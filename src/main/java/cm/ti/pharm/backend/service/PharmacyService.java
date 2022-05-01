package cm.ti.pharm.backend.service;

import cm.ti.pharm.backend.domain.Pharmacy;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Pharmacy}.
 */
public interface PharmacyService {
    /**
     * Save a pharmacy.
     *
     * @param pharmacy the entity to save.
     * @return the persisted entity.
     */
    Pharmacy save(Pharmacy pharmacy);

    /**
     * Updates a pharmacy.
     *
     * @param pharmacy the entity to update.
     * @return the persisted entity.
     */
    Pharmacy update(Pharmacy pharmacy);

    /**
     * Partially updates a pharmacy.
     *
     * @param pharmacy the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Pharmacy> partialUpdate(Pharmacy pharmacy);

    /**
     * Get all the pharmacies.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Pharmacy> findAll(Pageable pageable);

    /**
     * Get the "id" pharmacy.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Pharmacy> findOne(Long id);

    /**
     * Delete the "id" pharmacy.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

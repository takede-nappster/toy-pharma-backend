package cm.ti.pharm.backend.service.impl;

import cm.ti.pharm.backend.domain.Disponibility;
import cm.ti.pharm.backend.repository.DisponibilityRepository;
import cm.ti.pharm.backend.service.DisponibilityService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Disponibility}.
 */
@Service
@Transactional
public class DisponibilityServiceImpl implements DisponibilityService {

    private final Logger log = LoggerFactory.getLogger(DisponibilityServiceImpl.class);

    private final DisponibilityRepository disponibilityRepository;

    public DisponibilityServiceImpl(DisponibilityRepository disponibilityRepository) {
        this.disponibilityRepository = disponibilityRepository;
    }

    @Override
    public Disponibility save(Disponibility disponibility) {
        log.debug("Request to save Disponibility : {}", disponibility);
        return disponibilityRepository.save(disponibility);
    }

    @Override
    public Disponibility update(Disponibility disponibility) {
        log.debug("Request to save Disponibility : {}", disponibility);
        return disponibilityRepository.save(disponibility);
    }

    @Override
    public Optional<Disponibility> partialUpdate(Disponibility disponibility) {
        log.debug("Request to partially update Disponibility : {}", disponibility);

        return disponibilityRepository
            .findById(disponibility.getId())
            .map(existingDisponibility -> {
                if (disponibility.getQuantity() != null) {
                    existingDisponibility.setQuantity(disponibility.getQuantity());
                }

                return existingDisponibility;
            })
            .map(disponibilityRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Disponibility> findAll(Pageable pageable) {
        log.debug("Request to get all Disponibilities");
        return disponibilityRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Disponibility> findOne(Long id) {
        log.debug("Request to get Disponibility : {}", id);
        return disponibilityRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Disponibility : {}", id);
        disponibilityRepository.deleteById(id);
    }
}

package cm.ti.pharm.backend.service.impl;

import cm.ti.pharm.backend.domain.Drug;
import cm.ti.pharm.backend.repository.DrugRepository;
import cm.ti.pharm.backend.service.DrugService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Drug}.
 */
@Service
@Transactional
public class DrugServiceImpl implements DrugService {

    private final Logger log = LoggerFactory.getLogger(DrugServiceImpl.class);

    private final DrugRepository drugRepository;

    public DrugServiceImpl(DrugRepository drugRepository) {
        this.drugRepository = drugRepository;
    }

    @Override
    public Drug save(Drug drug) {
        log.debug("Request to save Drug : {}", drug);
        return drugRepository.save(drug);
    }

    @Override
    public Drug update(Drug drug) {
        log.debug("Request to save Drug : {}", drug);
        return drugRepository.save(drug);
    }

    @Override
    public Optional<Drug> partialUpdate(Drug drug) {
        log.debug("Request to partially update Drug : {}", drug);

        return drugRepository
            .findById(drug.getId())
            .map(existingDrug -> {
                if (drug.getName() != null) {
                    existingDrug.setName(drug.getName());
                }
                if (drug.getDescription() != null) {
                    existingDrug.setDescription(drug.getDescription());
                }
                if (drug.getType() != null) {
                    existingDrug.setType(drug.getType());
                }
                if (drug.getPrice() != null) {
                    existingDrug.setPrice(drug.getPrice());
                }

                return existingDrug;
            })
            .map(drugRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Drug> findAll(Pageable pageable) {
        log.debug("Request to get all Drugs");
        return drugRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Drug> findOne(Long id) {
        log.debug("Request to get Drug : {}", id);
        return drugRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Drug : {}", id);
        drugRepository.deleteById(id);
    }
}

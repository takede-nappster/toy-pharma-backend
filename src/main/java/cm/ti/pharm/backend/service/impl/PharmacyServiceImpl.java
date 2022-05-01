package cm.ti.pharm.backend.service.impl;

import cm.ti.pharm.backend.domain.Pharmacy;
import cm.ti.pharm.backend.repository.PharmacyRepository;
import cm.ti.pharm.backend.service.PharmacyService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Pharmacy}.
 */
@Service
@Transactional
public class PharmacyServiceImpl implements PharmacyService {

    private final Logger log = LoggerFactory.getLogger(PharmacyServiceImpl.class);

    private final PharmacyRepository pharmacyRepository;

    public PharmacyServiceImpl(PharmacyRepository pharmacyRepository) {
        this.pharmacyRepository = pharmacyRepository;
    }

    @Override
    public Pharmacy save(Pharmacy pharmacy) {
        log.debug("Request to save Pharmacy : {}", pharmacy);
        return pharmacyRepository.save(pharmacy);
    }

    @Override
    public Pharmacy update(Pharmacy pharmacy) {
        log.debug("Request to save Pharmacy : {}", pharmacy);
        return pharmacyRepository.save(pharmacy);
    }

    @Override
    public Optional<Pharmacy> partialUpdate(Pharmacy pharmacy) {
        log.debug("Request to partially update Pharmacy : {}", pharmacy);

        return pharmacyRepository
            .findById(pharmacy.getId())
            .map(existingPharmacy -> {
                if (pharmacy.getName() != null) {
                    existingPharmacy.setName(pharmacy.getName());
                }
                if (pharmacy.getLocation() != null) {
                    existingPharmacy.setLocation(pharmacy.getLocation());
                }
                if (pharmacy.getPhone() != null) {
                    existingPharmacy.setPhone(pharmacy.getPhone());
                }

                return existingPharmacy;
            })
            .map(pharmacyRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Pharmacy> findAll(Pageable pageable) {
        log.debug("Request to get all Pharmacies");
        return pharmacyRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Pharmacy> findOne(Long id) {
        log.debug("Request to get Pharmacy : {}", id);
        return pharmacyRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Pharmacy : {}", id);
        pharmacyRepository.deleteById(id);
    }
}

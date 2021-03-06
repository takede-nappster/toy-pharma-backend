package cm.ti.pharm.backend.web.rest;

import cm.ti.pharm.backend.domain.Drug;
import cm.ti.pharm.backend.repository.DrugRepository;
import cm.ti.pharm.backend.service.DrugService;
import cm.ti.pharm.backend.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link cm.ti.pharm.backend.domain.Drug}.
 */
@RestController
@RequestMapping("/api")
public class DrugResource {

    private final Logger log = LoggerFactory.getLogger(DrugResource.class);

    private static final String ENTITY_NAME = "drug";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DrugService drugService;

    private final DrugRepository drugRepository;

    public DrugResource(DrugService drugService, DrugRepository drugRepository) {
        this.drugService = drugService;
        this.drugRepository = drugRepository;
    }

    /**
     * {@code POST  /drugs} : Create a new drug.
     *
     * @param drug the drug to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new drug, or with status {@code 400 (Bad Request)} if the drug has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/drugs")
    public ResponseEntity<Drug> createDrug(@RequestBody Drug drug) throws URISyntaxException {
        log.debug("REST request to save Drug : {}", drug);
        if (drug.getId() != null) {
            throw new BadRequestAlertException("A new drug cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Drug result = drugService.save(drug);
        return ResponseEntity
            .created(new URI("/api/drugs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /drugs/:id} : Updates an existing drug.
     *
     * @param id the id of the drug to save.
     * @param drug the drug to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated drug,
     * or with status {@code 400 (Bad Request)} if the drug is not valid,
     * or with status {@code 500 (Internal Server Error)} if the drug couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/drugs/{id}")
    public ResponseEntity<Drug> updateDrug(@PathVariable(value = "id", required = false) final Long id, @RequestBody Drug drug)
        throws URISyntaxException {
        log.debug("REST request to update Drug : {}, {}", id, drug);
        if (drug.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, drug.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!drugRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Drug result = drugService.update(drug);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, drug.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /drugs/:id} : Partial updates given fields of an existing drug, field will ignore if it is null
     *
     * @param id the id of the drug to save.
     * @param drug the drug to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated drug,
     * or with status {@code 400 (Bad Request)} if the drug is not valid,
     * or with status {@code 404 (Not Found)} if the drug is not found,
     * or with status {@code 500 (Internal Server Error)} if the drug couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/drugs/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Drug> partialUpdateDrug(@PathVariable(value = "id", required = false) final Long id, @RequestBody Drug drug)
        throws URISyntaxException {
        log.debug("REST request to partial update Drug partially : {}, {}", id, drug);
        if (drug.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, drug.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!drugRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Drug> result = drugService.partialUpdate(drug);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, drug.getId().toString())
        );
    }

    /**
     * {@code GET  /drugs} : get all the drugs.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of drugs in body.
     */
    @GetMapping("/drugs")
    public ResponseEntity<List<Drug>> getAllDrugs(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Drugs");
        Page<Drug> page = drugService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /drugs/:id} : get the "id" drug.
     *
     * @param id the id of the drug to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the drug, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/drugs/{id}")
    public ResponseEntity<Drug> getDrug(@PathVariable Long id) {
        log.debug("REST request to get Drug : {}", id);
        Optional<Drug> drug = drugService.findOne(id);
        return ResponseUtil.wrapOrNotFound(drug);
    }

    /**
     * {@code DELETE  /drugs/:id} : delete the "id" drug.
     *
     * @param id the id of the drug to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/drugs/{id}")
    public ResponseEntity<Void> deleteDrug(@PathVariable Long id) {
        log.debug("REST request to delete Drug : {}", id);
        drugService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

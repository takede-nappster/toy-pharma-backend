package cm.ti.pharm.backend.web.rest;

import cm.ti.pharm.backend.domain.Disponibility;
import cm.ti.pharm.backend.repository.DisponibilityRepository;
import cm.ti.pharm.backend.service.DisponibilityService;
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
 * REST controller for managing {@link cm.ti.pharm.backend.domain.Disponibility}.
 */
@RestController
@RequestMapping("/api")
public class DisponibilityResource {

    private final Logger log = LoggerFactory.getLogger(DisponibilityResource.class);

    private static final String ENTITY_NAME = "disponibility";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DisponibilityService disponibilityService;

    private final DisponibilityRepository disponibilityRepository;

    public DisponibilityResource(DisponibilityService disponibilityService, DisponibilityRepository disponibilityRepository) {
        this.disponibilityService = disponibilityService;
        this.disponibilityRepository = disponibilityRepository;
    }

    /**
     * {@code POST  /disponibilities} : Create a new disponibility.
     *
     * @param disponibility the disponibility to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new disponibility, or with status {@code 400 (Bad Request)} if the disponibility has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/disponibilities")
    public ResponseEntity<Disponibility> createDisponibility(@RequestBody Disponibility disponibility) throws URISyntaxException {
        log.debug("REST request to save Disponibility : {}", disponibility);
        if (disponibility.getId() != null) {
            throw new BadRequestAlertException("A new disponibility cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Disponibility result = disponibilityService.save(disponibility);
        return ResponseEntity
            .created(new URI("/api/disponibilities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /disponibilities/:id} : Updates an existing disponibility.
     *
     * @param id the id of the disponibility to save.
     * @param disponibility the disponibility to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated disponibility,
     * or with status {@code 400 (Bad Request)} if the disponibility is not valid,
     * or with status {@code 500 (Internal Server Error)} if the disponibility couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/disponibilities/{id}")
    public ResponseEntity<Disponibility> updateDisponibility(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Disponibility disponibility
    ) throws URISyntaxException {
        log.debug("REST request to update Disponibility : {}, {}", id, disponibility);
        if (disponibility.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, disponibility.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!disponibilityRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Disponibility result = disponibilityService.update(disponibility);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, disponibility.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /disponibilities/:id} : Partial updates given fields of an existing disponibility, field will ignore if it is null
     *
     * @param id the id of the disponibility to save.
     * @param disponibility the disponibility to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated disponibility,
     * or with status {@code 400 (Bad Request)} if the disponibility is not valid,
     * or with status {@code 404 (Not Found)} if the disponibility is not found,
     * or with status {@code 500 (Internal Server Error)} if the disponibility couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/disponibilities/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Disponibility> partialUpdateDisponibility(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Disponibility disponibility
    ) throws URISyntaxException {
        log.debug("REST request to partial update Disponibility partially : {}, {}", id, disponibility);
        if (disponibility.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, disponibility.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!disponibilityRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Disponibility> result = disponibilityService.partialUpdate(disponibility);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, disponibility.getId().toString())
        );
    }

    /**
     * {@code GET  /disponibilities} : get all the disponibilities.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of disponibilities in body.
     */
    @GetMapping("/disponibilities")
    public ResponseEntity<List<Disponibility>> getAllDisponibilities(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Disponibilities");
        Page<Disponibility> page = disponibilityService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /disponibilities/:id} : get the "id" disponibility.
     *
     * @param id the id of the disponibility to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the disponibility, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/disponibilities/{id}")
    public ResponseEntity<Disponibility> getDisponibility(@PathVariable Long id) {
        log.debug("REST request to get Disponibility : {}", id);
        Optional<Disponibility> disponibility = disponibilityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(disponibility);
    }

    /**
     * {@code DELETE  /disponibilities/:id} : delete the "id" disponibility.
     *
     * @param id the id of the disponibility to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/disponibilities/{id}")
    public ResponseEntity<Void> deleteDisponibility(@PathVariable Long id) {
        log.debug("REST request to delete Disponibility : {}", id);
        disponibilityService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

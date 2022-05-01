package cm.ti.pharm.backend.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import cm.ti.pharm.backend.IntegrationTest;
import cm.ti.pharm.backend.domain.Disponibility;
import cm.ti.pharm.backend.repository.DisponibilityRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link DisponibilityResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DisponibilityResourceIT {

    private static final Long DEFAULT_QUANTITY = 1L;
    private static final Long UPDATED_QUANTITY = 2L;

    private static final String ENTITY_API_URL = "/api/disponibilities";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DisponibilityRepository disponibilityRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDisponibilityMockMvc;

    private Disponibility disponibility;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Disponibility createEntity(EntityManager em) {
        Disponibility disponibility = new Disponibility().quantity(DEFAULT_QUANTITY);
        return disponibility;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Disponibility createUpdatedEntity(EntityManager em) {
        Disponibility disponibility = new Disponibility().quantity(UPDATED_QUANTITY);
        return disponibility;
    }

    @BeforeEach
    public void initTest() {
        disponibility = createEntity(em);
    }

    @Test
    @Transactional
    void createDisponibility() throws Exception {
        int databaseSizeBeforeCreate = disponibilityRepository.findAll().size();
        // Create the Disponibility
        restDisponibilityMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(disponibility)))
            .andExpect(status().isCreated());

        // Validate the Disponibility in the database
        List<Disponibility> disponibilityList = disponibilityRepository.findAll();
        assertThat(disponibilityList).hasSize(databaseSizeBeforeCreate + 1);
        Disponibility testDisponibility = disponibilityList.get(disponibilityList.size() - 1);
        assertThat(testDisponibility.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    void createDisponibilityWithExistingId() throws Exception {
        // Create the Disponibility with an existing ID
        disponibility.setId(1L);

        int databaseSizeBeforeCreate = disponibilityRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDisponibilityMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(disponibility)))
            .andExpect(status().isBadRequest());

        // Validate the Disponibility in the database
        List<Disponibility> disponibilityList = disponibilityRepository.findAll();
        assertThat(disponibilityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDisponibilities() throws Exception {
        // Initialize the database
        disponibilityRepository.saveAndFlush(disponibility);

        // Get all the disponibilityList
        restDisponibilityMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(disponibility.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.intValue())));
    }

    @Test
    @Transactional
    void getDisponibility() throws Exception {
        // Initialize the database
        disponibilityRepository.saveAndFlush(disponibility);

        // Get the disponibility
        restDisponibilityMockMvc
            .perform(get(ENTITY_API_URL_ID, disponibility.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(disponibility.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingDisponibility() throws Exception {
        // Get the disponibility
        restDisponibilityMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDisponibility() throws Exception {
        // Initialize the database
        disponibilityRepository.saveAndFlush(disponibility);

        int databaseSizeBeforeUpdate = disponibilityRepository.findAll().size();

        // Update the disponibility
        Disponibility updatedDisponibility = disponibilityRepository.findById(disponibility.getId()).get();
        // Disconnect from session so that the updates on updatedDisponibility are not directly saved in db
        em.detach(updatedDisponibility);
        updatedDisponibility.quantity(UPDATED_QUANTITY);

        restDisponibilityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDisponibility.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDisponibility))
            )
            .andExpect(status().isOk());

        // Validate the Disponibility in the database
        List<Disponibility> disponibilityList = disponibilityRepository.findAll();
        assertThat(disponibilityList).hasSize(databaseSizeBeforeUpdate);
        Disponibility testDisponibility = disponibilityList.get(disponibilityList.size() - 1);
        assertThat(testDisponibility.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    void putNonExistingDisponibility() throws Exception {
        int databaseSizeBeforeUpdate = disponibilityRepository.findAll().size();
        disponibility.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDisponibilityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, disponibility.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(disponibility))
            )
            .andExpect(status().isBadRequest());

        // Validate the Disponibility in the database
        List<Disponibility> disponibilityList = disponibilityRepository.findAll();
        assertThat(disponibilityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDisponibility() throws Exception {
        int databaseSizeBeforeUpdate = disponibilityRepository.findAll().size();
        disponibility.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDisponibilityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(disponibility))
            )
            .andExpect(status().isBadRequest());

        // Validate the Disponibility in the database
        List<Disponibility> disponibilityList = disponibilityRepository.findAll();
        assertThat(disponibilityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDisponibility() throws Exception {
        int databaseSizeBeforeUpdate = disponibilityRepository.findAll().size();
        disponibility.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDisponibilityMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(disponibility)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Disponibility in the database
        List<Disponibility> disponibilityList = disponibilityRepository.findAll();
        assertThat(disponibilityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDisponibilityWithPatch() throws Exception {
        // Initialize the database
        disponibilityRepository.saveAndFlush(disponibility);

        int databaseSizeBeforeUpdate = disponibilityRepository.findAll().size();

        // Update the disponibility using partial update
        Disponibility partialUpdatedDisponibility = new Disponibility();
        partialUpdatedDisponibility.setId(disponibility.getId());

        partialUpdatedDisponibility.quantity(UPDATED_QUANTITY);

        restDisponibilityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDisponibility.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDisponibility))
            )
            .andExpect(status().isOk());

        // Validate the Disponibility in the database
        List<Disponibility> disponibilityList = disponibilityRepository.findAll();
        assertThat(disponibilityList).hasSize(databaseSizeBeforeUpdate);
        Disponibility testDisponibility = disponibilityList.get(disponibilityList.size() - 1);
        assertThat(testDisponibility.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    void fullUpdateDisponibilityWithPatch() throws Exception {
        // Initialize the database
        disponibilityRepository.saveAndFlush(disponibility);

        int databaseSizeBeforeUpdate = disponibilityRepository.findAll().size();

        // Update the disponibility using partial update
        Disponibility partialUpdatedDisponibility = new Disponibility();
        partialUpdatedDisponibility.setId(disponibility.getId());

        partialUpdatedDisponibility.quantity(UPDATED_QUANTITY);

        restDisponibilityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDisponibility.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDisponibility))
            )
            .andExpect(status().isOk());

        // Validate the Disponibility in the database
        List<Disponibility> disponibilityList = disponibilityRepository.findAll();
        assertThat(disponibilityList).hasSize(databaseSizeBeforeUpdate);
        Disponibility testDisponibility = disponibilityList.get(disponibilityList.size() - 1);
        assertThat(testDisponibility.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    void patchNonExistingDisponibility() throws Exception {
        int databaseSizeBeforeUpdate = disponibilityRepository.findAll().size();
        disponibility.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDisponibilityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, disponibility.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(disponibility))
            )
            .andExpect(status().isBadRequest());

        // Validate the Disponibility in the database
        List<Disponibility> disponibilityList = disponibilityRepository.findAll();
        assertThat(disponibilityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDisponibility() throws Exception {
        int databaseSizeBeforeUpdate = disponibilityRepository.findAll().size();
        disponibility.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDisponibilityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(disponibility))
            )
            .andExpect(status().isBadRequest());

        // Validate the Disponibility in the database
        List<Disponibility> disponibilityList = disponibilityRepository.findAll();
        assertThat(disponibilityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDisponibility() throws Exception {
        int databaseSizeBeforeUpdate = disponibilityRepository.findAll().size();
        disponibility.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDisponibilityMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(disponibility))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Disponibility in the database
        List<Disponibility> disponibilityList = disponibilityRepository.findAll();
        assertThat(disponibilityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDisponibility() throws Exception {
        // Initialize the database
        disponibilityRepository.saveAndFlush(disponibility);

        int databaseSizeBeforeDelete = disponibilityRepository.findAll().size();

        // Delete the disponibility
        restDisponibilityMockMvc
            .perform(delete(ENTITY_API_URL_ID, disponibility.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Disponibility> disponibilityList = disponibilityRepository.findAll();
        assertThat(disponibilityList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

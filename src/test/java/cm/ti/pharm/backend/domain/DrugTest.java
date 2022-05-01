package cm.ti.pharm.backend.domain;

import static org.assertj.core.api.Assertions.assertThat;

import cm.ti.pharm.backend.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DrugTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Drug.class);
        Drug drug1 = new Drug();
        drug1.setId(1L);
        Drug drug2 = new Drug();
        drug2.setId(drug1.getId());
        assertThat(drug1).isEqualTo(drug2);
        drug2.setId(2L);
        assertThat(drug1).isNotEqualTo(drug2);
        drug1.setId(null);
        assertThat(drug1).isNotEqualTo(drug2);
    }
}

package cm.ti.pharm.backend.domain;

import static org.assertj.core.api.Assertions.assertThat;

import cm.ti.pharm.backend.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DisponibilityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Disponibility.class);
        Disponibility disponibility1 = new Disponibility();
        disponibility1.setId(1L);
        Disponibility disponibility2 = new Disponibility();
        disponibility2.setId(disponibility1.getId());
        assertThat(disponibility1).isEqualTo(disponibility2);
        disponibility2.setId(2L);
        assertThat(disponibility1).isNotEqualTo(disponibility2);
        disponibility1.setId(null);
        assertThat(disponibility1).isNotEqualTo(disponibility2);
    }
}

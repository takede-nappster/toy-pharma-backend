package cm.ti.pharm.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Pharmacy.
 */
@Entity
@Table(name = "pharmacy")
public class Pharmacy implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "location")
    private String location;

    @Column(name = "phone")
    private String phone;

    @OneToMany(mappedBy = "pharmacy")
    @JsonIgnoreProperties(value = { "pharmacy", "drug" }, allowSetters = true)
    private Set<Disponibility> disponibilities = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Pharmacy id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Pharmacy name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return this.location;
    }

    public Pharmacy location(String location) {
        this.setLocation(location);
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPhone() {
        return this.phone;
    }

    public Pharmacy phone(String phone) {
        this.setPhone(phone);
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Set<Disponibility> getDisponibilities() {
        return this.disponibilities;
    }

    public void setDisponibilities(Set<Disponibility> disponibilities) {
        if (this.disponibilities != null) {
            this.disponibilities.forEach(i -> i.setPharmacy(null));
        }
        if (disponibilities != null) {
            disponibilities.forEach(i -> i.setPharmacy(this));
        }
        this.disponibilities = disponibilities;
    }

    public Pharmacy disponibilities(Set<Disponibility> disponibilities) {
        this.setDisponibilities(disponibilities);
        return this;
    }

    public Pharmacy addDisponibility(Disponibility disponibility) {
        this.disponibilities.add(disponibility);
        disponibility.setPharmacy(this);
        return this;
    }

    public Pharmacy removeDisponibility(Disponibility disponibility) {
        this.disponibilities.remove(disponibility);
        disponibility.setPharmacy(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pharmacy)) {
            return false;
        }
        return id != null && id.equals(((Pharmacy) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Pharmacy{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", location='" + getLocation() + "'" +
            ", phone='" + getPhone() + "'" +
            "}";
    }
}

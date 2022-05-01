package cm.ti.pharm.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Drug.
 */
@Entity
@Table(name = "drug")
public class Drug implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "type")
    private String type;

    @Column(name = "price")
    private Double price;

    @OneToMany(mappedBy = "drug")
    @JsonIgnoreProperties(value = { "pharmacy", "drug" }, allowSetters = true)
    private Set<Disponibility> disponibilities = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Drug id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Drug name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public Drug description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return this.type;
    }

    public Drug type(String type) {
        this.setType(type);
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getPrice() {
        return this.price;
    }

    public Drug price(Double price) {
        this.setPrice(price);
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Set<Disponibility> getDisponibilities() {
        return this.disponibilities;
    }

    public void setDisponibilities(Set<Disponibility> disponibilities) {
        if (this.disponibilities != null) {
            this.disponibilities.forEach(i -> i.setDrug(null));
        }
        if (disponibilities != null) {
            disponibilities.forEach(i -> i.setDrug(this));
        }
        this.disponibilities = disponibilities;
    }

    public Drug disponibilities(Set<Disponibility> disponibilities) {
        this.setDisponibilities(disponibilities);
        return this;
    }

    public Drug addDisponibilities(Disponibility disponibility) {
        this.disponibilities.add(disponibility);
        disponibility.setDrug(this);
        return this;
    }

    public Drug removeDisponibilities(Disponibility disponibility) {
        this.disponibilities.remove(disponibility);
        disponibility.setDrug(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Drug)) {
            return false;
        }
        return id != null && id.equals(((Drug) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Drug{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", type='" + getType() + "'" +
            ", price=" + getPrice() +
            "}";
    }
}

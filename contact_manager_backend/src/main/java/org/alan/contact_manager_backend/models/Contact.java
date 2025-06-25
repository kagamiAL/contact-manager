package org.alan.contact_manager_backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Objects;

@Entity
public class Contact {
    @Id
    @SequenceGenerator(name = "contact_seq_gen", sequenceName = "CONTACT_SEQ")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "contact_seq_gen")
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "owner_id")
    @JsonIgnore
    private AppUser appUser;

    @Column(nullable = false, name = "first_name")
    private String firstName;

    @Column(nullable = false, name = "last_name")
    private String lastName;

    @Column(nullable = false, name = "zip_code")
    private String zipCode;

    @Column(nullable = false, name = "date_of_birth")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    @Override
    public int hashCode() {
        return Objects.hash(firstName, lastName, zipCode, dateOfBirth);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj instanceof Contact contact) {
            return contact.firstName.equals(firstName) && contact.lastName.equals(lastName)
                    && contact.zipCode.equals(zipCode) && contact.dateOfBirth.equals(dateOfBirth);
        }
        return false;
    }

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

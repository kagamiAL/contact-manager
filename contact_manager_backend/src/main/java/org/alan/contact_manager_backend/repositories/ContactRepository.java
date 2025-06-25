package org.alan.contact_manager_backend.repositories;

import org.alan.contact_manager_backend.models.AppUser;
import org.alan.contact_manager_backend.models.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Optional;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    void deleteAllByAppUserAndIdIn(AppUser appUser, Collection<Long> ids);

    Page<Contact> findAllByAppUser(AppUser appUser, Pageable pageable);

    @Query("SELECT c FROM Contact c WHERE c.appUser = :appUser AND c.firstName = :firstName AND c.lastName = :lastName AND c.zipCode = :zipCode AND c.dateOfBirth = :dateOfBirth")
    Optional<Contact> findDuplicateContact(
            @Param("appUser") AppUser appUser,
            @Param("firstName") String firstName,
            @Param("lastName") String lastName,
            @Param("zipCode") String zipCode,
            @Param("dateOfBirth") LocalDate dateOfBirth
    );
}

package org.alan.contact_manager_backend.repositories;

import org.alan.contact_manager_backend.models.AppUser;
import org.alan.contact_manager_backend.models.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    void deleteAllByAppUserAndIdIn(AppUser appUser, Collection<Long> ids);

    ArrayList<Contact> findAllByAppUser(AppUser appUser);

    @Query("SELECT c FROM Contact c WHERE c.appUser = :appUser AND c.first_name = :first_name AND c.last_name = :last_name AND c.zip_code = :zip_code AND c.date_of_birth = :date_of_birth")
    Optional<Contact> findDuplicateContact(
            @Param("appUser") AppUser appUser,
            @Param("first_name") String first_name,
            @Param("last_name") String last_name,
            @Param("zip_code") String zip_code,
            @Param("date_of_birth") LocalDate date_of_birth
    );
}

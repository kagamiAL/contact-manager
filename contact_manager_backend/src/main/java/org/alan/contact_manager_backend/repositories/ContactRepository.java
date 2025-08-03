package org.alan.contact_manager_backend.repositories;

import org.alan.contact_manager_backend.models.AppUser;
import org.alan.contact_manager_backend.models.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    void deleteAllByAppUserAndIdIn(AppUser appUser, Collection<Long> ids);

    Page<Contact> findAllByAppUser(AppUser appUser, Pageable pageable);

    Page<Contact> findByAppUserAndFirstNameIgnoreCaseStartingWith(AppUser appUser, String firstName, Pageable pageable);

    Page<Contact> findByAppUserAndLastNameIgnoreCaseStartingWith(AppUser appUser, String lastName, Pageable pageable);

    @Query(
            """
    SELECT c FROM Contact c
    WHERE c.appUser = :appUser
      AND LOWER(c.firstName) LIKE LOWER(CONCAT(:firstName, '%'))
      AND LOWER(c.lastName) LIKE LOWER(CONCAT(:lastName, '%'))
    """)
    Page<Contact> searchContactsByAppUserAndFullName(
            AppUser appUser, String firstName, String lastName, Pageable pageable);

    Collection<Contact> findAllByAppUserAndUniqueHashIn(AppUser appUser, Collection<String> uniqueHashes);

    Collection<Contact> findAllByAppUserAndIdIn(AppUser appUser, Collection<Long> ids);
}

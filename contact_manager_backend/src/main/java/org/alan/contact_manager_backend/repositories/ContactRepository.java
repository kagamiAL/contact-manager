package org.alan.contact_manager_backend.repositories;

import org.alan.contact_manager_backend.models.AppUser;
import org.alan.contact_manager_backend.models.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    void deleteAllByAppUserAndIdIn(AppUser appUser, Collection<Long> ids);

    Page<Contact> findAllByAppUser(AppUser appUser, Pageable pageable);

    Collection<Contact> findAllByAppUserAndUniqueHashIn(AppUser appUser, Collection<String> uniqueHashes);
}

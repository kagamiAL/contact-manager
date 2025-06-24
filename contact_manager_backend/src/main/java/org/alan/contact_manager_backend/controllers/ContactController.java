package org.alan.contact_manager_backend.controllers;

import org.alan.contact_manager_backend.dtos.ContactBody;
import org.alan.contact_manager_backend.models.AppUser;
import org.alan.contact_manager_backend.models.Contact;
import org.alan.contact_manager_backend.repositories.AppUserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final AppUserRepository appUserRepository;

    public ContactController(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @PostMapping("/add")
    @Transactional()
    public ResponseEntity<?> addContacts(@RequestBody @Validated List<ContactBody> contactBodies) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AppUser appUser = appUserRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User does not exist"));
        for (ContactBody contactBody : contactBodies) {
            Contact contact = new Contact();
            contact.setFirst_name(contactBody.firstName());
            contact.setLast_name(contactBody.lastName());
            contact.setDate_of_birth(contactBody.dateOfBirth());
            contact.setZip_code(contactBody.zipCode());
            if (!appUser.getJoinColumnContacts().contains(contact))
                appUser.getJoinColumnContacts().add(contact);
        }
        return ResponseEntity.ok().body("Added contacts successfully!");
    }

    @DeleteMapping("/delete")
    @Transactional()
    public ResponseEntity<?> deleteContacts(@RequestBody @Validated List<Long> contactIDs) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AppUser appUser = appUserRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User does not exist"));
        HashSet<Long> set = new HashSet<>(contactIDs);
        appUser.getJoinColumnContacts().removeIf(contact -> set.contains(contact.getId()));
        return ResponseEntity.ok().body("Deleted contacts successfully!");
    }
}

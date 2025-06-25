package org.alan.contact_manager_backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.alan.contact_manager_backend.dtos.ContactBody;
import org.alan.contact_manager_backend.models.AppUser;
import org.alan.contact_manager_backend.models.Contact;
import org.alan.contact_manager_backend.repositories.AppUserRepository;
import org.alan.contact_manager_backend.repositories.ContactRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final AppUserRepository appUserRepository;

    private final ContactRepository contactRepository;

    private final ObjectMapper objectMapper;

    public ContactController(AppUserRepository appUserRepository, ContactRepository contactRepository, ObjectMapper objectMapper) {
        this.appUserRepository = appUserRepository;
        this.contactRepository = contactRepository;
        this.objectMapper = objectMapper;
    }

    /**
     * Simply throws a user not found error
     *
     * @return The error
     */
    private UsernameNotFoundException usernameNotFoundException() {
        return new UsernameNotFoundException("User does not exist");
    }

    @PostMapping("/add")
    @Transactional()
    public ResponseEntity<?> addContacts(@RequestBody @Validated List<ContactBody> contactBodies) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AppUser appUser = appUserRepository.findByEmail(authentication.getName())
                .orElseThrow(this::usernameNotFoundException);
        for (ContactBody contactBody : contactBodies) {
            Contact contact = new Contact();
            contact.setAppUser(appUser);
            contact.setFirstName(contactBody.firstName());
            contact.setLastName(contactBody.lastName());
            contact.setDateOfBirth(contactBody.dateOfBirth());
            contact.setZipCode(contactBody.zipCode());
            if (contactRepository.findDuplicateContact(
                    appUser,
                    contact.getFirstName(),
                    contact.getLastName(),
                    contact.getZipCode(),
                    contact.getDateOfBirth()).isEmpty()) {
                contactRepository.save(contact);
            }
        }
        return ResponseEntity.ok().body("Added contacts successfully!");
    }

    @DeleteMapping("/delete")
    @Transactional()
    public ResponseEntity<?> deleteContacts(@RequestBody @Validated List<Long> contactIDs) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AppUser appUser = appUserRepository.findByEmail(authentication.getName())
                .orElseThrow(this::usernameNotFoundException);
        contactRepository.deleteAllByAppUserAndIdIn(appUser, contactIDs);
        return ResponseEntity.ok().body("Deleted contacts successfully!");
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllContacts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "firstName") String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending
    ) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AppUser appUser = appUserRepository.findByEmail(authentication.getName()).orElseThrow(
                this::usernameNotFoundException);
        Sort sort = ascending ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return ResponseEntity.ok().body(contactRepository.findAllByAppUser(appUser, pageable));
    }

}

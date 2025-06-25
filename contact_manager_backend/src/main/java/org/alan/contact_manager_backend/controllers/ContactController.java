package org.alan.contact_manager_backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.alan.contact_manager_backend.dtos.ContactBody;
import org.alan.contact_manager_backend.models.AppUser;
import org.alan.contact_manager_backend.models.Contact;
import org.alan.contact_manager_backend.repositories.AppUserRepository;
import org.alan.contact_manager_backend.repositories.ContactRepository;
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
            contact.setFirst_name(contactBody.firstName());
            contact.setLast_name(contactBody.lastName());
            contact.setDate_of_birth(contactBody.dateOfBirth());
            contact.setZip_code(contactBody.zipCode());
            if (contactRepository.findDuplicateContact(
                    appUser,
                    contact.getFirst_name(),
                    contact.getLast_name(),
                    contact.getZip_code(),
                    contact.getDate_of_birth()).isEmpty()) {
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
    public ResponseEntity<?> getAllContacts() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AppUser appUser = appUserRepository.findByEmail(authentication.getName()).orElseThrow(
                this::usernameNotFoundException);
        ObjectNode objectNode = objectMapper.createObjectNode();
        objectNode.set("contacts", objectMapper.valueToTree(contactRepository.findAllByAppUser(appUser)));
        return ResponseEntity.ok().body(objectNode);
    }

}

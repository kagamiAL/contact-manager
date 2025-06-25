package org.alan.contact_manager_backend.controllers;

import org.alan.contact_manager_backend.dtos.ContactBody;
import org.alan.contact_manager_backend.models.AppUser;
import org.alan.contact_manager_backend.services.AuthenticationService;
import org.alan.contact_manager_backend.services.ContactService;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final AuthenticationService authenticationService;

    private final ContactService contactService;

    public ContactController(AuthenticationService authenticationService, ContactService contactService) {
        this.authenticationService = authenticationService;
        this.contactService = contactService;
    }

    @PostMapping("/add")
    @Transactional()
    public ResponseEntity<?> addContacts(@RequestBody @Validated List<ContactBody> contactBodies) {
        AppUser appUser = authenticationService.getCurrentAppUser();
        contactService.saveAllContactBodies(appUser, contactBodies);
        return ResponseEntity.ok().body("Added contacts successfully!");
    }

    @DeleteMapping("/delete")
    @Transactional()
    public ResponseEntity<?> deleteContacts(@RequestBody @Validated List<Long> contactIDs) {
        AppUser appUser = authenticationService.getCurrentAppUser();
        contactService.deleteContactsByIDs(appUser, contactIDs);
        return ResponseEntity.ok().body("Deleted contacts successfully!");
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllContacts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "firstName") String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending) {
        AppUser appUser = authenticationService.getCurrentAppUser();
        return ResponseEntity.ok().body(contactService.getAll(appUser, page, size, sortBy, ascending));
    }
}

package org.alan.contact_manager_backend.controllers;

import org.alan.contact_manager_backend.dtos.ContactBody;
import org.alan.contact_manager_backend.dtos.EditContactBody;
import org.alan.contact_manager_backend.dtos.PageableParams;
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
        return ResponseEntity.ok()
                .body(contactService.getAll(appUser, new PageableParams(page, size, sortBy, ascending)));
    }

    @GetMapping("/search-firstname")
    public ResponseEntity<?> getAllContactsMatchingFirstName(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "firstName") String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending,
            @RequestParam() String search) {
        AppUser appUser = authenticationService.getCurrentAppUser();
        PageableParams pageableParams = new PageableParams(page, size, sortBy, ascending);
        return ResponseEntity.ok()
                .body(contactService.findContactsByMatchingFirstName(appUser, search, pageableParams));
    }

    @GetMapping("/search-lastname")
    public ResponseEntity<?> getAllContactsMatchingLastName(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "firstName") String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending,
            @RequestParam() String search) {
        AppUser appUser = authenticationService.getCurrentAppUser();
        PageableParams pageableParams = new PageableParams(page, size, sortBy, ascending);
        return ResponseEntity.ok().body(contactService.findContactsByMatchingLastName(appUser, search, pageableParams));
    }

    @GetMapping("/search-fullname")
    public ResponseEntity<?> getAllContactsMatchingFullName(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "firstName") String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending,
            @RequestParam() String search) {
        AppUser appUser = authenticationService.getCurrentAppUser();
        PageableParams pageableParams = new PageableParams(page, size, sortBy, ascending);
        return ResponseEntity.ok().body(contactService.findContactsByMatchingFullName(appUser, search, pageableParams));
    }

    @PostMapping("/update")
    @Transactional()
    public ResponseEntity<?> updateContacts(@RequestBody @Validated List<EditContactBody> editContactBodies) {
        AppUser appUser = authenticationService.getCurrentAppUser();
        contactService.editContactsByIDs(appUser, editContactBodies);
        return ResponseEntity.ok().body("Updated contacts successfully!");
    }
}

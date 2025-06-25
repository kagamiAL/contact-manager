package org.alan.contact_manager_backend.services;

import org.alan.contact_manager_backend.dtos.ContactBody;
import org.alan.contact_manager_backend.dtos.PageResult;
import org.alan.contact_manager_backend.models.AppUser;
import org.alan.contact_manager_backend.models.Contact;
import org.alan.contact_manager_backend.repositories.ContactRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    /**
     * Converts fields from a contact to a unique string hash
     *
     * @param appUserId   The user ID of the AppUser
     * @param firstName   The first name of the contact
     * @param lastName    The last name of the contact
     * @param zipCode     The zip code of the contact
     * @param dateOfBirth The date of birth of the contact
     * @return The string hash
     */
    private String getHashFromFields(
            long appUserId, String firstName, String lastName, String zipCode, LocalDate dateOfBirth) {
        String data = String.join("|", String.valueOf(appUserId), firstName, lastName, zipCode, dateOfBirth.toString());
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(data.getBytes());
            StringBuilder sb = new StringBuilder();
            for (var b : hash) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Converts a contact body into its respect hash
     * @param appUser The owner of the contact
     * @param contactBody The contact body
     * @return The hash string
     */
    private String getContactHash(AppUser appUser, ContactBody contactBody) {
        return getHashFromFields(
                appUser.getId(),
                contactBody.firstName(),
                contactBody.lastName(),
                contactBody.zipCode(),
                contactBody.dateOfBirth());
    }

    /**
     * Converts a contact into its hash
     *
     * @param contact The contact
     * @return The string hash
     */
    private String getContactHash(Contact contact) {
        return getHashFromFields(
                contact.getAppUser().getId(),
                contact.getFirstName(),
                contact.getLastName(),
                contact.getZipCode(),
                contact.getDateOfBirth());
    }

    /**
     * Creates a Contact from a ContactBody and its respective AppUser
     * @param appUser The AppUser
     * @param contactBody The ContactBody
     * @return the Contact created from both the ContactBody and AppUser
     */
    private Contact getContactFromContactBody(AppUser appUser, ContactBody contactBody) {
        Contact contact = new Contact();
        contact.setAppUser(appUser);
        contact.setUniqueHash(getContactHash(appUser, contactBody));
        contact.setFirstName(contactBody.firstName());
        contact.setLastName(contactBody.lastName());
        contact.setDateOfBirth(contactBody.dateOfBirth());
        contact.setZipCode(contactBody.zipCode());
        return contact;
    }

    /**
     * Saves all Contact Bodies into Contacts in the ContactRepository
     * @param appUser the AppUser to save to
     * @param contactBodies the Contact Bodies
     */
    public void saveAllContactBodies(AppUser appUser, List<ContactBody> contactBodies) {
        List<String> uniqueHashes = contactBodies.stream()
                .map(contactBody -> getContactHash(appUser, contactBody))
                .toList();
        Collection<Contact> existing = contactRepository.findAllByAppUserAndUniqueHashIn(appUser, uniqueHashes);
        Set<String> duplicates = existing.stream().map(this::getContactHash).collect(Collectors.toSet());
        List<Contact> contactsToSave = contactBodies.stream()
                .map(contactBody -> getContactFromContactBody(appUser, contactBody))
                .filter(contact -> !duplicates.contains(contact.getUniqueHash()))
                .toList();
        contactRepository.saveAll(contactsToSave);
    }

    /**
     * Deletes the AppUser's contacts in a list of IDs
     * @param appUser the App User
     * @param contactIDs the List Of IDs to delete
     */
    public void deleteContactsByIDs(AppUser appUser, List<Long> contactIDs) {
        contactRepository.deleteAllByAppUserAndIdIn(appUser, contactIDs);
    }

    /**
     * Gets all the contacts into a page with parameters
     * @param appUser the App User
     * @param page the current page number
     * @param size the size of each page
     * @param sortBy sort by what column
     * @param ascending ascending or descending
     * @return a PageResult of the query
     */
    public PageResult<Contact> getAll(AppUser appUser, int page, int size, String sortBy, boolean ascending) {
        Sort sort = ascending ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Contact> contactPage = contactRepository.findAllByAppUser(appUser, pageable);
        return new PageResult<>(
                contactPage.getContent(),
                contactPage.getNumber(),
                contactPage.getSize(),
                contactPage.getTotalElements(),
                contactPage.getTotalPages());
    }
}

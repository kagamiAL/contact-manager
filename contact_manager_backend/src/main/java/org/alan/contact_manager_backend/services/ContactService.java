package org.alan.contact_manager_backend.services;

import org.alan.contact_manager_backend.dtos.ContactBody;
import org.alan.contact_manager_backend.dtos.EditContactBody;
import org.alan.contact_manager_backend.dtos.PageResult;
import org.alan.contact_manager_backend.dtos.PageableParams;
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
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    /**
     * Creates a PageResult DTO from a Page of contacts
     * @param page the page of contacts
     * @return the resulting PageResult DTO
     */
    private PageResult<Contact> getPageResultFromContactPage(Page<Contact> page) {
        return new PageResult<>(
                page.getContent(), page.getNumber(), page.getSize(), page.getTotalElements(), page.getTotalPages());
    }

    /**
     * Creates a Pageable from PageableParams, TODO: May be moved somewhere else because this method doesn't really belong here
     * @param pageableParams the PageableParams DTO to create the Pageable out of
     * @return the resulting Pageable object
     */
    private Pageable getPageableFromPageableParams(PageableParams pageableParams) {
        Sort sort = pageableParams.ascending()
                ? Sort.by(pageableParams.sortBy()).ascending()
                : Sort.by(pageableParams.sortBy()).descending();
        return PageRequest.of(pageableParams.page(), pageableParams.size(), sort);
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
     * Updates a Contact based on the passed EditContactBody DTO
     * @param contact the Contact to update
     * @param editContactBody the EditContactBody to base the update on
     */
    private void updateContactWithEditContactBody(Contact contact, EditContactBody editContactBody) {
        assert contact != null;
        editContactBody.firstName().ifPresent(contact::setFirstName);
        editContactBody.lastName().ifPresent(contact::setLastName);
        editContactBody.zipCode().ifPresent(contact::setZipCode);
        editContactBody.dateOfBirth().ifPresent(contact::setDateOfBirth);
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
     * @param pageableParams the PageableParams to use for Pageable parameters
     * @return a PageResult of the query
     */
    public PageResult<Contact> getAll(AppUser appUser, PageableParams pageableParams) {
        Page<Contact> contactPage =
                contactRepository.findAllByAppUser(appUser, getPageableFromPageableParams(pageableParams));
        return getPageResultFromContactPage(contactPage);
    }

    /**
     * Edits and updates the contacts with specified IDs
     * @param appUser The App User that the contacts belong to
     * @param editContactBodies A list of data specifying what to update and with which IDs
     */
    public void editContactsByIDs(AppUser appUser, List<EditContactBody> editContactBodies) {
        List<Long> filterIds =
                editContactBodies.stream().map(EditContactBody::Id).toList();
        Map<Long, Contact> contactMap = contactRepository.findAllByAppUserAndIdIn(appUser, filterIds).stream()
                .collect(Collectors.toMap(Contact::getId, contact -> contact));
        for (EditContactBody contactBody : editContactBodies) {
            if (!contactMap.containsKey(contactBody.Id())) {
                continue;
            }
            updateContactWithEditContactBody(contactMap.get(contactBody.Id()), contactBody);
        }
    }

    /**
     * Finds all contacts belonging to the AppUser that matches the first name provided
     * @param appUser the App user the contacts belong to
     * @param firstName the first name to match
     * @param pageableParams the PageableParams
     * @return a PageResult of matching contacts
     */
    public PageResult<Contact> findContactsByMatchingFirstName(
            AppUser appUser, String firstName, PageableParams pageableParams) {
        Page<Contact> contactPage = contactRepository.findByAppUserAndFirstNameIgnoreCaseStartingWith(
                appUser, firstName, getPageableFromPageableParams(pageableParams));
        return getPageResultFromContactPage(contactPage);
    }

    /**
     * Finds all contacts belonging to the AppUser that matches the last name provided
     * @param appUser the App user the contacts belong to
     * @param lastName the last name to match
     * @param pageableParams the PageableParams
     * @return a PageResult of matching contacts
     */
    public PageResult<Contact> findContactsByMatchingLastName(
            AppUser appUser, String lastName, PageableParams pageableParams) {
        Page<Contact> contactPage = contactRepository.findByAppUserAndLastNameIgnoreCaseStartingWith(
                appUser, lastName, getPageableFromPageableParams(pageableParams));
        return getPageResultFromContactPage(contactPage);
    }

    /**
     * Finds all contacts belonging to the AppUser that matches the firstname and lastname provided
     * @param appUser the App user the contacts belong to
     * @param fullName the full name to match
     * @param pageableParams the PageableParams
     * @return a PageResult of matching contacts
     */
    public PageResult<Contact> findContactsByMatchingFullName(
            AppUser appUser, String fullName, PageableParams pageableParams) {
        String[] splitted = fullName.split("\\s+");
        if (splitted.length < 2) {
            return findContactsByMatchingFirstName(appUser, splitted[0], pageableParams);
        }
        Page<Contact> contactPage = contactRepository.searchContactsByAppUserAndFullName(
                appUser, splitted[0], splitted[1], getPageableFromPageableParams(pageableParams));
        return getPageResultFromContactPage(contactPage);
    }
}

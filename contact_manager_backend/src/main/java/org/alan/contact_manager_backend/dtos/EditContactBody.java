package org.alan.contact_manager_backend.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.util.Optional;

public record EditContactBody(
        @NotBlank(message = "Contact ID is required") Long Id,
        Optional<String> firstName,
        Optional<String> lastName,
        Optional<String> zipCode,
        @JsonFormat(pattern = "yyyy-MM-dd") Optional<LocalDate> dateOfBirth) {}

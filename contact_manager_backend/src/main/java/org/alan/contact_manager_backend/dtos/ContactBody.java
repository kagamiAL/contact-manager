package org.alan.contact_manager_backend.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record ContactBody(

        @NotBlank(message = "First name is required")
        String firstName,

        @NotBlank(message = "Last name is required")
        String lastName,

        @NotBlank(message = "Zip code is required")
        String zipCode,

        @NotBlank(message = "Date of birth is required")
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate dateOfBirth
) {
}

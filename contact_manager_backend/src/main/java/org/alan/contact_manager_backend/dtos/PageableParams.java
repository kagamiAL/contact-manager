package org.alan.contact_manager_backend.dtos;

public record PageableParams(int page, int size, String sortBy, boolean ascending) {}

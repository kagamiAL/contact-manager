package org.alan.contact_manager_backend.dtos;

import java.util.List;

public record PageResult<T>(List<T> content, int page, int size, long totalElements, int totalPages) {}

package org.alan.contact_manager_backend.controllers;

import org.alan.contact_manager_backend.dtos.JwtAuthenticationResponse;
import org.alan.contact_manager_backend.dtos.AuthorizationRequest;
import org.alan.contact_manager_backend.services.AuthenticationService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public JwtAuthenticationResponse signUp(@Validated @RequestBody AuthorizationRequest authorizationRequest) {
        return authenticationService.signUp(authorizationRequest);
    }

    @PostMapping("/signIn")
    public JwtAuthenticationResponse signIn(@Validated @RequestBody AuthorizationRequest authorizationRequest) {
        return authenticationService.signIn(authorizationRequest);
    }
}

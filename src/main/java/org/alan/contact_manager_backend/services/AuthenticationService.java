package org.alan.contact_manager_backend.services;

import org.alan.contact_manager_backend.dtos.JwtAuthenticationResponse;
import org.alan.contact_manager_backend.dtos.SignUpRequest;
import org.alan.contact_manager_backend.models.AppUser;
import org.alan.contact_manager_backend.repositories.AppUserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final AppUserRepository userRepository;
    private final AppUserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(AppUserRepository userRepository, AppUserService userService, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public JwtAuthenticationResponse signUp(SignUpRequest request) {
        AppUser appUser = new AppUser();
        appUser.setEmail(request.email());
        appUser.setPassword(passwordEncoder.encode(request.password()));
        appUser = userService.save(appUser);
        String jwt = jwtService.generateToken(appUser);
        return new JwtAuthenticationResponse(jwt);
    }
}

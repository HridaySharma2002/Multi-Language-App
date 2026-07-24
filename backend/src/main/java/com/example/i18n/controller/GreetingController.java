package com.example.i18n.controller;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class GreetingController {

    private final MessageSource messageSource;

    public GreetingController(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @GetMapping("/greeting")
    public Map<String, String> getGreeting() {
        String greeting = messageSource.getMessage("api.greeting.welcome", null, LocaleContextHolder.getLocale());
        Map<String, String> response = new HashMap<>();
        response.put("message", greeting);
        return response;
    }

    @GetMapping("/error-demo")
    public Map<String, String> getError() {
        String errorMsg = messageSource.getMessage("api.error.not_found", null, LocaleContextHolder.getLocale());
        Map<String, String> response = new HashMap<>();
        response.put("error", errorMsg);
        return response;
    }
}

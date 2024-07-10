package com.library.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.security.SecureRandom;
import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    private String address;
    private String phoneNo;
    private String email;
    private String confirmationCode;
    private boolean isActive;
    private LocalDate createdAt;
    private LocalDate updatedAt;
    private Long updatedBy;

    // Method to generate a 6-digit alphanumeric confirmation code
    public static String generateConfirmationCode() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder confirmationCode = new StringBuilder(6);

        for (int i = 0; i < 6; i++) {
            int index = random.nextInt(characters.length());
            confirmationCode.append(characters.charAt(index));
        }

        return confirmationCode.toString();
    }
    public void setConfirmationCode() {
        this.confirmationCode = generateConfirmationCode();
    }
}

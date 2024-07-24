package com.library.Utils;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
public class StringCharacterValidator implements ConstraintValidator<StringCharacter, String> {
    @Override
    public void initialize(StringCharacter constraintAnnotation) {
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value != null && value.matches("^[a-zA-Z ]{3,}$");
    }
}

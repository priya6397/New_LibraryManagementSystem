package com.library.Utils;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
public class AlphanumericValidator implements ConstraintValidator<Alphanumeric, String> {
    @Override
    public void initialize(Alphanumeric constraintAnnotation) {
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value != null && value.matches("^[a-zA-Z0-9\\s]*$");
    }
}

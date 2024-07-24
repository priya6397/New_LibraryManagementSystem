package com.library.Utils;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;

public class DateConstraintValidator implements ConstraintValidator<DateConstraint, LocalDate>{
    @Override
    public boolean isValid(LocalDate startDate, ConstraintValidatorContext context) {
        if (startDate == null) {
            return false;
        }
        LocalDate today = LocalDate.now();
        return !startDate.isBefore(today);
    }
}

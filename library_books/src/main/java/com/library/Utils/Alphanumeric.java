package com.library.Utils;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = AlphanumericValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)

public @interface Alphanumeric {
    String message() default "Field should not contain any special character.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

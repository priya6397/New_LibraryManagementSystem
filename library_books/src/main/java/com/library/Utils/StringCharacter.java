package com.library.Utils;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = StringCharacterValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)

public @interface StringCharacter {
    String message() default "Field should not contain any digit, special character.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

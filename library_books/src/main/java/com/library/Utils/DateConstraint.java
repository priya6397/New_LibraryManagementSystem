package com.library.Utils;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = DateConstraintValidator.class)

public @interface DateConstraint {
    String message() default "Start date must be today or a future date.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

package com.library.Utils;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = NumericValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)

public @interface Numeric {
    String message() default "Field must be a valid number";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

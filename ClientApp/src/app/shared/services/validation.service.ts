import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'

export class ValidationService {

    static childrenEqual: ValidatorFn = (formGroup: FormGroup) => {
        const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {})
        const isValid = otherControlNames.every(controlName => formGroup.get(controlName).value === formGroup.get(firstControlName).value)
        return isValid ? null : { childrenNotEqual: true }
    }

    static containsSpace(control: AbstractControl): boolean | null {
        if (control.value && (control.value as string).indexOf(' ') !== -1) {
            return true
        }
        return null
    }

}

export class ConfirmValidParentMatcher implements ErrorStateMatcher {

    isErrorState(control: FormControl | null): boolean {
        return control.parent.invalid && control.touched
    }

}

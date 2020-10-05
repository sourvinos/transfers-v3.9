import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'

export class ValidationService {

    static childrenEqual: ValidatorFn = (formGroup: FormGroup) => {
        const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {})
        const isValid = otherControlNames.every(controlName => formGroup.get(controlName).value === formGroup.get(firstControlName).value)
        return isValid ? null : { childrenNotEqual: true }
    }

    static containsSpace(control: AbstractControl): { [key: string]: any } {
        return control.value && (control.value as string).indexOf(' ') !== -1 ? { containsSpace: true } : null
    }

    static isTime(control: AbstractControl): { [key: string]: any } {
        if (control.value) {
            const time = control.value
            if (time.length == 5 && time.indexOf(':') == 2) {
                return null
            }
            return { isTime: false }
        }
    }
}

export class ConfirmValidParentMatcher implements ErrorStateMatcher {

    isErrorState(control: FormControl | null): boolean {
        return control.parent.invalid && control.touched
    }

}

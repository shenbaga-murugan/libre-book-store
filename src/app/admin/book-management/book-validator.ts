import { AbstractControl, ValidationErrors } from "@angular/forms";

export class BookValidators {
    static validISBN(control: AbstractControl): ValidationErrors | null {
        const isbnRegex: RegExp = /^[0-9]{3}-[0-9]{1}-[0-9]{2}-[0-9]{6}-[0-9]{1}$/g;
        let enteredISBN = control.value as string;
        if(!enteredISBN.match(isbnRegex)) {
            return {invalidISBN: "xxx-x-xx-xxxxxx-x"}
        }
        return null;
    }
}
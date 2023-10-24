import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import luhn from 'luhn';

@ValidatorConstraint({ name: 'isValidCreditCard', async: false })
export class IsValidCreditCardValidator implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    return luhn.validate(value);
  }

  defaultMessage(): string {
    return 'El número de tarjeta es inválido';
  }
}

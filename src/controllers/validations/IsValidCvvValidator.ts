import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isValidCvv', async: false })
export class IsValidCvvValidator implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    if (typeof value !== 'string') {
      return false;
    }
    return /^[0-9]{3,4}$/.test(value);
  }

  defaultMessage(): string {
    return 'El cvv de la tarjeta es inválido';
  }
}

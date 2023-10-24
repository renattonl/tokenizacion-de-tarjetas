import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'IsValidYearCard', async: false })
export class IsValidYearCardValidator implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const year = (new Date()).getFullYear();
    const val = Number(value);
    if (val >= year && val <= (year+5)) return true;
    return false;
  }

  defaultMessage(): string {
    return 'El año de la tarjeta es inválido';
  }
}

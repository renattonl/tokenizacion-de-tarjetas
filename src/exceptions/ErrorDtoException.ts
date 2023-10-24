import { ValidationError } from "class-validator";

export class ErrorDtoException extends Error{

  public statusCode = 422;
  public errors: ValidationError[];

  constructor(errors: ValidationError[], message?: string) {
    super(message ?? 'Hubo un problema al validar los campos');
    this.errors = errors;
  }
}
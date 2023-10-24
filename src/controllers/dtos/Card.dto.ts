import { IsEmail, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength, Validate } from "class-validator";
import { IsValidCreditCardValidator } from "../validations/IsValidCreditCardValidator";
import { IsValidCvvValidator } from "../validations/IsValidCvvValidator";
import { IsValidYearCardValidator } from "../validations/IsValidYearCardValidator";

export class CardDTO {

  @IsString({ message: 'El email debe ser una cadena de string'})
  @MinLength(5, {message: 'El correo electrónico debe tener almenos 5 caracteres'})
  @MaxLength(100, {message: 'El correo electrónico no debe de pasar de 100 caracteres'})
  @IsEmail(
    { host_whitelist: ['gmail.com','hotmail.com', 'yahoo.es']}, 
    { message: 'El correo electrónico sólo esta permitido para gmail, hotmail y yahoo.es'}
  )
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(13, {message: 'El número de tarjeta debe contener al menos 13 caracteres'})
  @MaxLength(16, {message: 'El número de tarjeta debe contener al menos 16 caracteres'})
  @Validate(IsValidCreditCardValidator)
  card_number: string;

  @IsNotEmpty()
  @Validate(IsValidCvvValidator)
  cvv: string;

  @IsNotEmpty()
  @Validate(IsValidYearCardValidator)
  expiration_year: string;

  @IsNotEmpty()
  @Min(1, {message: 'El mes de la tarjeta es inválido'})
  @Max(12, {message: 'El mes de la tarjeta es inválido'})
  expiration_month: number;
}
import { IsNotEmpty, IsString, Length } from "class-validator";

export class TokenDTO {

  @IsNotEmpty()
  @IsString()
  @Length(16, 16, {message: 'El token es inválido'})
  token: string;

}
import { IsEmail, IsString, Length } from "class-validator";

export class RegistrationDto {
  @IsString({ message: "Должно быть строкой" })
  @IsEmail({}, { message: "Некорректный email" })
  readonly email: string;

  @IsString({ message: "Должно быть строкой" })
  @Length(4, 16, { message: "Не меньше 4 и не больше 16 символов" })
  readonly password: string;

  @IsString({ message: "Должно быть строкой" })
  readonly surname: string;

  @IsString({ message: "Должно быть строкой" })
  readonly name: string;

  @IsString({ message: "Должно быть строкой" })
  readonly phone: string;
}

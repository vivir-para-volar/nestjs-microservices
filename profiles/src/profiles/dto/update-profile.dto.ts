import { IsNumber, IsString } from "class-validator";

export class UpdateProfileDto {
  @IsNumber({}, { message: "Должно быть числом" })
  readonly id: number;

  @IsString({ message: "Должно быть строкой" })
  readonly surname: string;

  @IsString({ message: "Должно быть строкой" })
  readonly name: string;

  @IsString({ message: "Должно быть строкой" })
  readonly phone: string;

  @IsNumber({}, { message: "Должно быть числом" })
  readonly userId: number;

  constructor(surname: string, name: string, phone: string, userId: number) {
    this.surname = surname;
    this.name = name;
    this.phone = phone;
    this.userId = userId;
  }
}

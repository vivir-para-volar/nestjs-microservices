import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { User } from "../users/users.model";
import { Role } from "./roles.model";

@Table({ tableName: "user_roles", createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => User)
  userId: number;

  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => Role)
  roleId: number;
}

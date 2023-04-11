import { Model, Table, Column, DataType } from "sequelize-typescript";

interface ProfileCreationAttrs {
  surname: string;
  name: string;
  phone: string;
  userId: number;
}

@Table({ tableName: "profiles" })
export class Profile extends Model<Profile, ProfileCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  surname: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;

  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  userId: number;
}

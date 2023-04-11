import { UserRoles } from "./user-roles.model";
import { User } from "../users/users.model";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { RolesController } from "./roles.controller";
import { Role } from "./roles.model";
import { RolesService } from "./roles.service";
import { AuthModule } from "./../auth/auth.module";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles]), AuthModule],
  exports: [RolesService],
})
export class RolesModule {}

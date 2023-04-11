import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "./roles/roles.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  controllers: [],
  providers: [],

  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),

    SequelizeModule.forRoot({
      dialect: "postgres",
      host: "postgres_auth",
      port: 5432,
      username: "postgres",
      password: "root",
      database: "nest-microservices-auth",
      models: [User, Role, UserRoles],
      autoLoadModels: true,
    }),

    UsersModule,
    RolesModule,
    AuthModule,
  ],
})
export class AppModule {}

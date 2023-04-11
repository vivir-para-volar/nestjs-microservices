import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Profile } from "./profiles/profiles.model";
import { ProfilesModule } from "./profiles/profiles.module";

@Module({
  controllers: [],
  providers: [],

  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: "postgres_profiles",
      port: 5432,
      username: "postgres",
      password: "root",
      database: "nest-microservices-profiles",
      models: [Profile],
      autoLoadModels: true,
    }),

    ProfilesModule,
  ],
})
export class AppModule {}

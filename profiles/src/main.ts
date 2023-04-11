import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "./pipes/validation.pipe";

async function bootstrap() {
  const PORT = 3000;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("/api");
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () =>
    console.log(`Profiles Microservice started on port = ${PORT}`)
  );
}
bootstrap();

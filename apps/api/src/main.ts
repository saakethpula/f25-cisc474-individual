import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || undefined;
  app.enableCors({
    origin: ['https://f25-cisc474-individual-8gs54983q-saakethpulas-projects.vercel.app', 'https://f25-cisc474-individual-234i.onrender.com', 'http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  });

  await app.listen(port, host);
  
}

void bootstrap();

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Brainup API')
    .setDescription(
      'Dokumentasi REST API untuk aplikasi e-learning **Brainup**.\n\n' +
      '**Cara menggunakan autentikasi:**\n' +
      '1. Panggil `POST /api/auth/login` atau `POST /api/auth/register`\n' +
      '2. Salin nilai `accessToken` dari response\n' +
      '3. Klik tombol **Authorize 🔒** di atas dan masukkan token',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Masukkan JWT access token (tanpa prefix "Bearer ")',
        in: 'header',
      },
      'access-token',
    )
    .addTag('Auth', 'Registrasi, Login, Google OAuth, dan manajemen token')
    .addTag('Users', 'Manajemen profil dan data pengguna')
    .addTag('Categories', 'Manajemen kategori kursus')
    .addTag('Courses', 'Manajemen kursus (buat, edit, arsip)')
    .addTag('Sections', 'Manajemen section / bab di dalam kursus')
    .addTag('Lessons', 'Manajemen lesson / materi di dalam section')
    .addTag('Enrollments', 'Pendaftaran kursus oleh pengguna')
    .addTag('Ratings', 'Rating dan ulasan kursus')
    .addTag('Wishlist', 'Daftar kursus yang disimpan pengguna')
    .addTag('Orders', 'Transaksi pembelian kursus via Midtrans')
    .addTag('Trainer Request', 'Pengajuan & verifikasi akun trainer')
    .addTag('Trainer', 'Dashboard dan laporan penjualan trainer')
    .addTag('Lesson Completion', 'Penandaan lesson selesai & analitik belajar')
    .addTag('Gamification', 'Dashboard gamifikasi dan spin gacha')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Brainup API Docs',
  });
  const port = process.env['PORT'] || 3000;
  await app.listen(port);
  console.log(`🚀 Server running  → http://localhost:${port}`);
  console.log(`📄 Swagger docs    → http://localhost:${port}/api/docs`);
}

bootstrap();

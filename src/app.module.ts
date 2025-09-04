import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guard/auth.guard';
import { UserModule } from './modules/user/user.module';
import { CategoriyModule } from './modules/categoriy/categoriy.module';
import { SuggestModule } from './modules/suggest/suggest.module';
import { ReviewModule } from './modules/review/review.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoryItemModule } from './modules/category-item/category-item.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    CoreModule,
    AuthModule,
    UserModule,
    CategoriyModule,
    SuggestModule,
    ReviewModule,
    CategoryItemModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}

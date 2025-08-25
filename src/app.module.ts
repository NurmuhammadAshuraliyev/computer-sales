import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guard/auth.guard';
import { UserModule } from './modules/user/user.module';
import { CategoriyModule } from './modules/categoriy/categoriy.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [CoreModule, AuthModule, UserModule, CategoriyModule, OrderModule],
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

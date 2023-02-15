import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { AdminModule } from './module/admin/admin.module';

@Module({
  imports: [UserModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

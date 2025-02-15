import { Module } from '@nestjs/common';
import { EventsModule } from './event/event.module';

@Module({
  imports: [EventsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { EventsController } from './event.controller';
import { EventsService } from './event.service';

/**
 * ${1:Description placeholder}
 *
 * @export
 * @class EventsModule
 * @typedef {EventsModule}
 */
@Module({
    controllers: [EventsController],
    providers: [EventsService],
})
export class EventsModule {}

import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { EventsService } from './event.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Event } from './event.interface';

/**
 * ${1:Description placeholder}
 *
 * @export
 * @class EventsController
 * @typedef {EventsController}
 */
@Controller('api/events')
@ApiTags('Events')
export class EventsController {
    /**
 * Creates an instance of EventsController.
 *
 * @constructor
 * @param {EventsService} eventsService
 */
constructor(private readonly eventsService: EventsService) {}

    // Получить все события
    /**
 * ${1:Description placeholder}
 *
 * @returns {Event[]}
 */
@Get()
    @ApiOperation({ summary: 'Get all events' })
    @ApiResponse({ status: 200, description: 'List of events', type: [Event] })
    getEvents(): Event[] {
        return this.eventsService.getEvents();
    }

    // Получить события для конкретной даты
    /**
 * ${1:Description placeholder}
 *
 * @param {string} date
 * @returns {Event[]}
 */
@Get('date')
    @ApiOperation({ summary: 'Get events for a specific date' })
    @ApiResponse({
        status: 200,
        description: 'List of events for the specified date',
        type: [Event],
    })
    getEventsForDate(@Query('date') date: string): Event[] {
        return this.eventsService.getEventsForDate(date);
    }

    // Создать новое событие
    /**
 * ${1:Description placeholder}
 *
 * @param {Event} event
 * @returns {string}
 */
@Post()
    @ApiOperation({ summary: 'Create a new event' })
    @ApiResponse({ status: 201, description: 'The event has been created' })
    createEvent(@Body() event: Event): string {
        return this.eventsService.createEvent(event);
    }

    // Обновить существующее событие
    /**
 * ${1:Description placeholder}
 *
 * @param {string} id
 * @param {Event} updatedEvent
 * @returns {string}
 */
@Put(':id')
    @ApiOperation({ summary: 'Update an existing event' })
    @ApiResponse({ status: 200, description: 'The event has been updated' })
    updateEvent(@Param('id') id: string, @Body() updatedEvent: Event): string {
        return this.eventsService.updateEvent(id, updatedEvent);
    }

    // Удалить событие
    /**
 * ${1:Description placeholder}
 *
 * @param {string} id
 * @returns {string}
 */
@Delete(':id')
    @ApiOperation({ summary: 'Delete an event' })
    @ApiResponse({ status: 200, description: 'The event has been deleted' })
    deleteEvent(@Param('id') id: string): string {
        return this.eventsService.deleteEvent(id);
    }
}

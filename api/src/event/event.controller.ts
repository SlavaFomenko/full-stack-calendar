import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { EventsService } from './event.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Event } from './event.interface';

@Controller('api/events')
@ApiTags('Events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    // Получить все события
    @Get()
    @ApiOperation({ summary: 'Get all events' })
    @ApiResponse({ status: 200, description: 'List of events', type: [Event] })
    getEvents(): Event[] {
        return this.eventsService.getEvents();
    }

    // Получить события для конкретной даты
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
    @Post()
    @ApiOperation({ summary: 'Create a new event' })
    @ApiResponse({ status: 201, description: 'The event has been created' })
    createEvent(@Body() event: Event): string {
        return this.eventsService.createEvent(event);
    }

    // Обновить существующее событие
    @Put(':id')
    @ApiOperation({ summary: 'Update an existing event' })
    @ApiResponse({ status: 200, description: 'The event has been updated' })
    updateEvent(@Param('id') id: string, @Body() updatedEvent: Event): string {
        return this.eventsService.updateEvent(id, updatedEvent);
    }

    // Удалить событие
    @Delete(':id')
    @ApiOperation({ summary: 'Delete an event' })
    @ApiResponse({ status: 200, description: 'The event has been deleted' })
    deleteEvent(@Param('id') id: string): string {
        return this.eventsService.deleteEvent(id);
    }
}

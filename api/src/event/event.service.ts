import { Injectable } from '@nestjs/common';
import { Event } from './event.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EventsService {
    private readonly filePath = path.join(__dirname, '../../src/data/events.json');
    private readEventsFromFile(): Event[] {
        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(data);
        }
        return [];
    }

    private writeEventsToFile(events: Event[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(events, null, 2));
    }

    // Получить все события
    getEvents(): Event[] {
        return this.readEventsFromFile();
    }

    // Получить события для конкретной даты
    getEventsForDate(date: string): Event[] {
        const events = this.readEventsFromFile();
        return events.filter(event => event.date === date);  // Фильтруем по дате
    }

    // Создать новое событие
    createEvent(event: Event): string {
        const events = this.readEventsFromFile();
        events.push(event);
        this.writeEventsToFile(events);
        return 'Event created successfully';
    }

    // Обновить событие
    updateEvent(id: string, updatedEvent: Event): string {
        const events = this.readEventsFromFile();
        const eventIndex = events.findIndex(event => event.id === id);
        if (eventIndex !== -1) {
            events[eventIndex] = { ...events[eventIndex], ...updatedEvent };
            this.writeEventsToFile(events);
            return 'Event updated successfully';
        }
        return 'Event not found';
    }

    // Удалить событие
    deleteEvent(id: string): string {
        let events = this.readEventsFromFile();
        events = events.filter(event => event.id !== id);
        this.writeEventsToFile(events);
        return 'Event deleted successfully';
    }
}

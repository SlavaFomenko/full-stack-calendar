import { Injectable } from '@nestjs/common';
import { Event } from './event.interface';
import * as fs from 'fs';
import * as path from 'path';

/**
 * ${1:Description placeholder}
 *
 * @export
 * @class EventsService
 * @typedef {EventsService}
 */
@Injectable()
export class EventsService {
    /**
 * ${1:Description placeholder}
 *
 * @private
 * @readonly
 * @type {${2:*}}
 */
private readonly filePath = path.join(__dirname, '../../src/data/events.json');
    /**
 * ${1:Description placeholder}
 *
 * @private
 * @returns {Event[]}
 */
private readEventsFromFile(): Event[] {
        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(data);
        }
        return [];
    }

    /**
 * ${1:Description placeholder}
 *
 * @private
 * @param {Event[]} events
 */
private writeEventsToFile(events: Event[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(events, null, 2));
    }

    // Получить все события
    /**
 * ${1:Description placeholder}
 *
 * @returns {Event[]}
 */
getEvents(): Event[] {
        return this.readEventsFromFile();
    }

    // Получить события для конкретной даты
    /**
 * ${1:Description placeholder}
 *
 * @param {string} date
 * @returns {Event[]}
 */
getEventsForDate(date: string): Event[] {
        const events = this.readEventsFromFile();
        return events.filter(event => event.date === date);  // Фильтруем по дате
    }

    // Создать новое событие
    /**
 * ${1:Description placeholder}
 *
 * @param {Event} event
 * @returns {string}
 */
createEvent(event: Event): string {
        const events = this.readEventsFromFile();
        events.push(event);
        this.writeEventsToFile(events);
        return 'Event created successfully';
    }

    // Обновить событие
    /**
 * ${1:Description placeholder}
 *
 * @param {string} id
 * @param {Event} updatedEvent
 * @returns {string}
 */
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
    /**
 * ${1:Description placeholder}
 *
 * @param {string} id
 * @returns {string}
 */
deleteEvent(id: string): string {
        let events = this.readEventsFromFile();
        events = events.filter(event => event.id !== id);
        this.writeEventsToFile(events);
        return 'Event deleted successfully';
    }
}

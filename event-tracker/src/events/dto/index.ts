import { CreateEventDto } from './create.event.dto';

type EventDto = {
    id: string;
    eventType: string;
    eventSource: string;
    userId: string;
    timestamp: Date;
};

export { EventDto, CreateEventDto };

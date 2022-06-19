import EventsDao from '../dao/events.dao';
import { CreateEventDto, EventDto } from '../dto';
import { CRUD } from '../../common/crud.interface';

// CRUD interface is not fully implemented,
// EventsService class implements that interface to indicate
// That this is its intended future implementation.
class EventsService implements CRUD {
    create(eventFields: CreateEventDto): Promise<EventDto> {
        return EventsDao.addEvent(eventFields);
    }
}

export default new EventsService();

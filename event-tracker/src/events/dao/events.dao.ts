import { EventDto, CreateEventDto } from '../dto';
import { IDatabase } from '../../common/database.interface';
import DatabaseWrapperMock from '../../common/mocks/database-wrapper.mock';

class Dao {
    readonly db: IDatabase;
    readonly table: string;

    constructor(db: IDatabase, table: string) {
        this.db = db;
        this.table = table;
    }
}

class EventsDao extends Dao {
    constructor(db: IDatabase) {
        super(db, 'events');
    }

    async addEvent(eventFields: CreateEventDto): Promise<EventDto> {
        return await this.db.insert(eventFields, this.table);
    }
}

// Singleton pattern powered by node caching,
// Any file importing events.dao.ts will be handed a reference to
// the exported `new EventsDao()` instance.
// this is a in-memory dao
export default new EventsDao(DatabaseWrapperMock);

import { IDatabase } from '../database.interface';

type MockDbType = {
    id: string;
};

export class DatabaseWrapperMock implements IDatabase {
    async insert<T, Y>(fields: T, table: string): Promise<Y> {
        const newDbRecord: MockDbType = await this.insertRecord(fields, table);
        return this.mapDbResponseToDto(newDbRecord);
    }

    private async insertRecord<T>(
        fields: T,
        table: string
    ): Promise<MockDbType> {
        return await {
            id: 'some-id',
            ...fields,
        };
    }

    private mapDbResponseToDto(row: any) {
        // map to DTO
        return row;
    }
}

export default new DatabaseWrapperMock();

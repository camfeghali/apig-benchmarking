export interface IDatabase {
    insert: <T, Y>(fields: T, table: string) => Promise<Y>;
}

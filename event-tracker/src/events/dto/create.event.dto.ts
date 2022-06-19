export type CreateEventDto = {
    eventType: string;
    eventSource: string;
    userId: string;
    timestamp: Date;
};

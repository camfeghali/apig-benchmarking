import { APIGatewayProxyEvent } from 'aws-lambda';
import { CreateEventDto } from './events/dto';
import EventsService from './events/service/events.service';
import {
    validateEvent,
    validatePayload,
    ValidPayload,
} from './events/validations';

export const lambdaHandler = async (event: APIGatewayProxyEvent) => {
    try {
        validateEvent(event);

        let body = JSON.parse(event.body || '{}');

        const validPayload: ValidPayload = validatePayload(body);

        const normalizedPayload: CreateEventDto = normalizeValidPayload(
            validPayload,
            event
        );

        await EventsService.create(normalizedPayload);

        return {
            statusCode: 204,
        };
    } catch (err) {
        return {
            statusCode: 400,
            body: (err as Error).message,
        };
    }
};

export function normalizeValidPayload(
    validPayload: ValidPayload,
    event: APIGatewayProxyEvent
): CreateEventDto {
    return {
        ...validPayload,
        timestamp: new Date(event.requestContext.requestTimeEpoch),
    };
}

import { APIGatewayProxyEvent } from 'aws-lambda';
import { CreateEventDto } from '../dto';
import {
    InvalidParamError,
    RequiredParameterError,
    InvalidRequest,
} from '../../common/errors';

type CreateEventDtoKeys = keyof CreateEventDto;
type RequiredParam = string | void;

type ValidEvents = {
    [eventType: string]: string;
};

export type ValidPayload = {
    eventType: string;
    eventSource: string;
    userId: string;
};

const validEvents: ValidEvents = {
    '#btn-1': 'buttonclick',
    '#btn-2': 'buttonclick',
    '#btn-3': 'buttonclick',
    '#navigation-1': 'navigationclick',
    '#navigation-2': 'navigationclick',
    '#navigation-3': 'navigationclick',
};

export const validateEvent = (event: APIGatewayProxyEvent) => {
    if (!event.body) {
        throw new InvalidRequest('body is required.');
    }
};

export const validatePayload = (body: any): ValidPayload => {
    let {
        eventType = requiredParam('eventType'),
        eventSource = requiredParam('eventSource'),
        userId = requiredParam('userId'),
    } = body;

    validateEventSourceTypePair(eventSource, eventType);
    validateUserId(userId);

    return { eventType, eventSource, userId };
};

function validateUserId(userId: RequiredParam) {
    if (!isValidUserId(userId)) {
        throw new InvalidParamError(`userId`);
    }
}

function validateEventSourceTypePair(
    eventSource: RequiredParam,
    eventType: RequiredParam
) {
    if (!isValidEvent(eventSource, eventType)) {
        throw new InvalidParamError(`eventSource | eventType`);
    }
}

const isValidEvent = (
    eventSource: RequiredParam,
    eventType: RequiredParam
): boolean => {
    // @ts-ignore
    return validEvents[eventSource] === eventType;
};

const isValidUserId = (userId: RequiredParam) => {
    const regexExp =
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    // @ts-ignore
    return regexExp.test(userId);
};

function requiredParam(param: CreateEventDtoKeys): void {
    throw new RequiredParameterError(param);
}

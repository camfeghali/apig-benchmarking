'use strict';

const app = require('../../dist/app.js');
const chai = require('chai');
const expect = chai.expect;
const mockEvent = require('../../../events/event-template.json');

describe('Tests valid request', function () {
    it('verifies returns status 204 with body', async () => {
        let event = {
            body: JSON.stringify({
                eventType: 'buttonclick',
                eventSource: '#btn-3',
                userId: 'b2166214-78f9-4e54-b0e9-483ad73c9e03',
            }),
            requestContext: { requestTimeEpoch: '1428582896000' },
        };
        const result = await app.lambdaHandler(event);
        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(204);
        expect(result.body).to.equal(undefined);
    });
});

describe('Tests normalizeValidPayload returns a EventDto', function () {
    it('normaliseValiPayload returns a CreateEventDto', async () => {
        let mockPayload = {
            eventType: 'buttonclick',
            eventSource: '#btn-3',
            userId: 'b2166214-78f9-4e54-b0e9-483ad73c9e03',
        };

        const normalizedPayload = app.normalizeValidPayload(
            mockPayload,
            mockEvent
        );
        expect(normalizedPayload).to.be.an('object');
        expect(normalizedPayload.timestamp).to.be.a('Date');
    });
});

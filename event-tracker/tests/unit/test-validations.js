'use strict';

const app = require('../../dist/app.js');
const chai = require('chai');
const expect = chai.expect;
var event, context;

describe('Tests request body conforms to schema', function () {
    it('verifies body is present', async () => {
        event = {};
        const result = await app.lambdaHandler(event, context);
        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(400);
        expect(result.body).to.equal('body is required.');
    });
    it('verifies required eventType param', async () => {
        event = {
            body: JSON.stringify({
                param1: 'param1',
            }),
        };
        const result = await app.lambdaHandler(event, context);
        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(400);
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('[eventType] is required.');
    });
    it('verifies required eventSource param', async () => {
        event = {
            body: JSON.stringify({
                eventType: 'param1',
            }),
        };
        const result = await app.lambdaHandler(event, context);
        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(400);
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('[eventSource] is required.');
    });
    it('verifies required userId param', async () => {
        event = {
            body: JSON.stringify({
                eventType: 'param1',
                eventSource: 'param2',
            }),
        };
        const result = await app.lambdaHandler(event, context);
        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(400);
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('[userId] is required.');
    });

    it('verifies eventType is valid', async () => {
        event = {
            body: JSON.stringify({
                eventType: 'param1',
                eventSource: 'param2',
                userId: 'param3',
            }),
        };
        const result = await app.lambdaHandler(event, context);
        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(400);
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('[eventSource | eventType] is invalid.');
    });
    it('verifies eventSource is valid', async () => {
        event = {
            body: JSON.stringify({
                eventType: 'buttonclick',
                eventSource: 'param2',
                userId: 'param3',
            }),
        };
        const result = await app.lambdaHandler(event, context);
        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(400);
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('[eventSource | eventType] is invalid.');
    });
    it('verifies userId is valid', async () => {
        event = {
            body: JSON.stringify({
                eventType: 'buttonclick',
                eventSource: '#btn-1',
                userId: 'param3',
            }),
        };
        const result = await app.lambdaHandler(event, context);
        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(400);
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('[userId] is invalid.');
    });
    it('verifies given a valid userId, eventSource and eventType pair is valid', async () => {
        event = {
            body: JSON.stringify({
                eventType: 'buttonclick',
                eventSource: '#navigation-1',
                userId: 'b2166214-78f9-4e54-b0e9-483ad73c9e03',
            }),
        };
        const result = await app.lambdaHandler(event, context);
        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(400);
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('[eventSource | eventType] is invalid.');
    });
});

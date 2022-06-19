export class InvalidParamError extends Error {
    code: Number;
    constructor(param: string) {
        super(`[${param}] is invalid.`);
        this.code = 400;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidParamError);
        }
    }
}

export class RequiredParameterError extends Error {
    code: Number;
    constructor(param: string) {
        super(`[${param}] is required.`);
        this.code = 400;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, RequiredParameterError);
        }
    }
}

export class InvalidRequest extends Error {
    code: Number;
    constructor(message: string) {
        super(message);
        this.code = 400;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidRequest);
        }
    }
}

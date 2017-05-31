export class Exception extends Error {

    public constructor(
        private _message: string,
        private _code: number|string
    ) {
        super(_message);
    }

    get message(): string {
        return this._message;
    }

    get code(): number | string {
        return this._code;
    }
}

interface IResponse {
    message: string
    code?: string | undefined
}

export default class SystemException extends Error {
    public readonly code;
    public readonly devInfo: any;

    constructor(
        public readonly response: IResponse,
    ) {
        super(response.message);
        this.code = response.code;

        this.initName();
    }

    public initName(): void {
        this.name = this.constructor.name;
    }

    public getInfo(): IResponse {
        return {
            message: this.response.message,
            code: this.response.code,
        };
    }

}

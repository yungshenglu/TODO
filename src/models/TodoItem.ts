export default class TodoItem {
    protected token: string;
    protected content: string;
    protected createDate: Date;
    protected doneDate: object;
    protected isDone: boolean;
    protected isEdit: boolean;

    constructor(content: string) {
        this.token = this.generateToken();
        this.content = content;
        this.createDate = new Date();
        this.doneDate = {};
        this.isDone = false;
        this.isEdit = false;
    }

    get getToken(): string {
        return this.token;
    }

    get getIsDone(): boolean {
        return this.isDone;
    }

    /* tslint:disable:no-bitwise */
    private generateToken(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
            const random = Math.random() * 16 | 0;
            const value = (char === ('x') ? random : (random % 4 + 8));
            return value.toString(16);
        });
    }
    /* tslint:enable:no-bitwise */
}

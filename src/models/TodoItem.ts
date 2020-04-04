export default class TodoItem {
    protected token: string;
    protected content: string;
    protected createDate: Date;
    protected completedDate: object;
    protected isCompleted: boolean;
    protected isEdit: boolean;

    constructor(content: string) {
        this.token = this.generateToken();
        this.content = content;
        this.createDate = new Date();
        this.completedDate = {};
        this.isCompleted = false;
        this.isEdit = false;
    }

    get getToken(): string {
        return this.token;
    }

    public updateContent(newContent: string) {
        this.content = newContent;
    }

    public toggleCompletedDate() {
        this.completedDate = (this.isCompleted) ? new Date() : {};
    }

    public toggleIsCompleted() {
        this.isCompleted = !this.isCompleted;
    }

    public toggleIsEdit() {
        this.isEdit = !this.isEdit;
    }

    private generateToken(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
            const random = Math.random() * 16 | 0;
            const value = (char === ('x') ? random : (random % 4 + 8));
            return value.toString(16);
        });
    }
}

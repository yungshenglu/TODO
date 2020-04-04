/**
 * For record each todo in the todoList
 */
export default class TodoItem {
    protected isCompleted: boolean;
    protected completedDate: object;
    protected token: string;
    protected content: string;
    protected createDate: object;
    protected isEdit: boolean;

    constructor(content: string) {
        this.token = this.generateToken();
        this.content = content;
        this.isCompleted = false;
        this.createDate = new Date();
        this.completedDate = {};
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

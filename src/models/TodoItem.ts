/**
 * For record each todo in the todoList
 */
export default class TodoItem {
    protected completed: boolean;
    protected completedDate: object;
    protected token: string;
    protected content: string;
    protected createDate: object;

    constructor(content: string) {
        this.token = this.generateToken();
        this.content = content;
        this.completed = false;
        this.createDate = new Date();
        this.completedDate = {};
    }

    get getToken(): string {
        return this.token;
    }

    public updateContent(newContent: string) {
        this.content = newContent;
    }

    public toggleCompleted() {
        this.completed = !this.completed;
    }

    public toggleCompletedDate() {
        this.completedDate = (this.completed) ? new Date() : {};
    }

    private generateToken(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
            const random = Math.random() * 16 | 0;
            const value = (char === ('x') ? random : (random % 4 + 8));
            return value.toString(16);
        });
    }
}

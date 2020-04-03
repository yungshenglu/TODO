/**
 * For record each todo in the todoList
 */
export default class TodoItem {
    private content: string;
    private completed: boolean;
    private createDate: object;
    private completedDate: object;

    constructor(content: string) {
        this.content = content;
        this.completed = false;
        this.createDate = new Date();
        this.completedDate = {};
    }

    public toggleChecked() {
        this.completed = !this.completed;
        this.completedDate = (this.completed) ? new Date() : {};
    }
}

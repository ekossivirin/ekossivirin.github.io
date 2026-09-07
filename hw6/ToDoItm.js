export default class ToDoItem {
    id;
    title;
    status;
    startDate;
    endDate;

    constructor(title) {
        this.title = title;
        this.status = "To Do";
        this.startDate = new Date();
        this.id = this.startDate.getTime();
    }

    setDone() {
        this.status = "Done";
        this.endDate = new Date();
    }
}
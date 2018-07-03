import { observable } from "mobx";

export enum TodoItemStatus{
    'completed',
    'active'
}

export class TodoModel{
    @observable public title: string;
    @observable public status: TodoItemStatus;
    @observable public isEditable:boolean;

    constructor(title: string){
        this.title = title;
        this.status = TodoItemStatus.active;
        this.isEditable = false;
    }
}
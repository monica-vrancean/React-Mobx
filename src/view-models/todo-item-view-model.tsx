
import { TodoModel, TodoItemStatus } from '../models/todo-model';
import { observable, computed, action } from 'mobx';
import { FilterTypes } from '../models/Filter-types';

export class TodoItemViewModel{
    @observable public title: string;
    @observable public status: TodoItemStatus;
    @observable public isEditable:boolean;

    constructor(title: string){
        this.title = title;
        this.status = TodoItemStatus.active;
        this.isEditable = false;
    }


    public completeTodo(){
        this.status = TodoItemStatus.completed;
    }

    public editTodo(){
        this.isEditable = true;
     }

    public updateTodo(newTodoValue: string){       
            this.title = newTodoValue;
            this.isEditable = false;        
    }

    @action
    public resetEditableTodo(){        
            this.isEditable = false;        
    }
}

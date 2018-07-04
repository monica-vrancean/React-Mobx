
import { TodoModel, TodoItemStatus } from '../models/todo-model';
import { observable, computed, action } from 'mobx';
import { FilterTypes } from '../models/Filter-types';
import { TodoItemViewModel } from './todo-item-view-model';

export class TodoListViewModel{
    @observable todos:TodoItemViewModel[] = [];
    @observable filter: FilterTypes = FilterTypes.All;
    @computed get getTodos(){
        switch(this.filter){
            case FilterTypes.All:
                return this.todos
            case FilterTypes.Completed:
                return this.todos.filter(todo=>todo.status === TodoItemStatus.completed)
            case FilterTypes.Active:
                return this.todos.filter(todo => todo.status === TodoItemStatus.active)
        }
        return this.todos;
    }

    public addTodo(todo: string){
      this.todos.push(new TodoItemViewModel(todo));
    }

    public deleteTodo(todoTitle: string){
        this.todos = this.todos.filter(todo=>todo.title!==todoTitle);
    }

    public completeTodo(todoTitle:string){
        this.todos.map(todo=>todo.title === todoTitle ? todo.status= TodoItemStatus.completed : todo);
    }

    public editTodo(todoTitle:string){
        let editTodo = this.todos.find(todo=>todo.title === todoTitle);
        if(editTodo){
            editTodo.isEditable = true;
        }
    }

    public applyFilter(filter:FilterTypes){
        this.filter = filter;  
    }

    public updateTodo(newTodoValue: string){
        let editableTodo = this.todos.find(todo=>todo.isEditable);
        if(editableTodo){
            editableTodo.title = newTodoValue;
            editableTodo.isEditable = false;
        }
    }

    @action
    public resetEditableTodo(){
        let editableTodo = this.todos.find(todo=>todo.isEditable);
        if(editableTodo){
            editableTodo.isEditable = false;
        }
    }
}

export default new TodoListViewModel();
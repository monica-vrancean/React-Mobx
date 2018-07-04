import { observer, inject } from 'mobx-react';

import './todo-list.css';


import * as React from 'react';

import Button from '../shared/button/button';
import { TodoListViewModel } from '../view-models/todo-list-view-model';
import * as classNames from 'classnames';
import { TodoItemStatus, TodoModel } from '../models/todo-model';
import { FilterTypes } from '../models/Filter-types';
import { action } from 'mobx';
import TodoItemComponent from './todo-item/todo-item';

interface Props{
  todoListViewModel:TodoListViewModel;
}

@inject('todoListViewModel')
@observer
class TodoList extends React.Component {
  private inputRef: React.RefObject<HTMLInputElement>
   store: TodoListViewModel;

   constructor(props:Props){
      super(props);
      this.store = props.todoListViewModel;
      this.inputRef = React.createRef();
  }

  addTodo(){
    if(this.inputRef.current){
     this.store.addTodo( this.inputRef.current.value );
     this.inputRef.current.value="";
    }
  }

  deleteTodo(todoTitle:string){
    this.store.deleteTodo(todoTitle);
  }

  completeTodo(todoTitle:string){
    this.store.completeTodo(todoTitle);
  }

  editTodo(todoTitle:string){
    this.store.editTodo(todoTitle);
  }

  isEditable(todo:TodoModel):boolean{
    return todo.isEditable;
  }

  keyPress(e: any){
    if(e.keyCode == 13){
      this.store.updateTodo(e.target.value);
    }
  }

  @action.bound
  resetEditable(){
    this.store.resetEditableTodo();
  }

  showAll(){
    this.store.applyFilter(FilterTypes.All);
  }

  showCompleted(){
    this.store.applyFilter(FilterTypes.Completed);
  }

  showActive(){
    this.store.applyFilter(FilterTypes.Active);
  }

  isFilterActive(filterType:FilterTypes):boolean{
    return this.store.filter === filterType;
  }

  public render(){       
        return (
      <div className="todo-list">
        <div className="header">
          <input placeholder="Add item" type="text" ref={this.inputRef}/>
          <Button value="Add" onClick={this.addTodo.bind(this)}/>
        </div>
        <Button value="All" isActive={()=>this.isFilterActive(FilterTypes.All)} onClick={this.showAll.bind(this)} />
        <Button value="Completed" isActive={()=>this.isFilterActive(FilterTypes.Completed)} onClick={this.showCompleted.bind(this)}/>
        <Button value="Active" isActive={()=>this.isFilterActive(FilterTypes.Active)} onClick={this.showActive.bind(this)}/>
        <ul>
          {this.store.getTodos.map((todo, index)=>{
            return <TodoItemComponent key={index} todoItem={todo} deleteTodo={this.deleteTodo.bind(this)}/>
          })}
        </ul>
      </div>
    );
}
  
}

export default TodoList;

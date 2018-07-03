import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import { TodoStore } from './store/store';
import TodoList from './todo-list/todo-list';

class App extends React.Component {
  public render() {
    const todoStore = new TodoStore();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Todo List</h1>
        </header>
        <TodoList store={todoStore}/>
      </div>
    );
  }
}

export default App;

import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import TodoList from './todo-list/todo-list';
import { Provider } from 'mobx-react';
import todoListViewModel from './view-models/todo-list-view-model';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Todo List</h1>
        </header>
        <Provider todoListViewModel={todoListViewModel}>
         <TodoList />
        </Provider>
      </div>
    );
  }
}

export default App;

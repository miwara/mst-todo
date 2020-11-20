import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { getSnapshot, types } from "mobx-state-tree";
import { observer } from "mobx-react";
import { values } from 'mobx';

let id = 1;
const randomId = () => ++id;

const Todo = types.model({
  id: types.identifierNumber,
  name: "",
  done: false
}).actions(self => {
  function setName(newName) {
    self.name = newName;
  }

  function toggle() {
    self.done = !self.done;
  }

  return { setName, toggle }
});

const User = types.model({
  name: "",
});

/*
↑の書き方は↓の書き方のショートカットにすぎない
const Todo = types.model({
  name: types.optional(types.string, ""),
  done: types.optional(types.boolean, false)
})

const User = types.model({
  name: types.optional(types.string, "")
})
*/

const RootStore = types.model({
  // すぐ下のstoreで定義しているので第二引数はいらない
  users: types.map(User),
  // 第二引数は必要
  todos: types.optional(types.map(Todo), {})
}).actions(self => {
  function addTodo(id, name) {
    self.todos.set(id, Todo.create({ id, name }));
  }

  return { addTodo };
});

const store = RootStore.create({
  users: {},
  todos: {
    "1": {
      id: id,
      name: "Eat a cake",
      done: true
    }
  }
});

const App = observer(props => (
  <div>
    <button onClick={e => props.store.addTodo(randomId(), "New Task")}>
      Add Task
    </button>
    {values(props.store.todos).map(todo => (
      <div key={todo.id}>
        <input
        type="checkbox"
        checked={todo.done}
        onChange={e => todo.toggle()}
        />
        <input
        type="text"
        value={todo.name}
        onChange={e => todo.setName(e.target.value)}
        />
        </div>
    ))}
  </div>
));

ReactDOM.render(<App store={store} />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

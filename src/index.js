import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { getSnapshot, types } from "mobx-state-tree";
import { observer } from "mobx-react";

const Todo = types.model({
  name: "",
  done: false
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
});

const store = RootStore.create({
  users: {}
});

ReactDOM.render(
  <div>
    store: {JSON.stringify(getSnapshot(store))}
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

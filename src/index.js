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

const john = User.create()
const eat = Todo.create({ name: "eat" })

console.log("Eat TODO", getSnapshot(eat))

ReactDOM.render(
  <div>
    John: {JSON.stringify(getSnapshot(john))}
    <br />
    Eat TODO: {JSON.stringify(getSnapshot(eat))}
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

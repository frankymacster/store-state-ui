import React from "react";
import ReactDOM from "react-dom";
import State from "./state";
import Store from "./store";

import "./styles.css";

// function App(state) {
//   return (
//     <div className="App">
//       <h2>You clicked {state.eval()} times!</h2>

//       <button onClick={() => state.map((n) => n - 1)}>Decrement</button>
//       <button onClick={() => state.map((n) => n + 1)}>Increment</button>
//     </div>
//   );
// }

// const AppWrapper = Store(App, State.of(4));

// ReactDOM.render(AppWrapper.extract(), document.getElementById("root"));

const App = Store((state) => {
  document.getElementById("root").innerHTML = `
    <div>${state.eval()}</div>
    <button id="inc">+1</button>
  `;
  document
    .getElementById("inc")
    .addEventListener("click", () => console.log("click"));
}, State.of(0));

App.extend((store) => {
  const state = store.pointer;

  return store.lookup(
    state.map((a) => a * 3)
    // .chain(n => State(s => [n, { ...s, tripled: n }]))
  );
}).extract();

import React from "react";
import "./App.css";
import TodoContainer from "./Components/TodoContainer";

const App: React.FC = (props) => {
  return (
    <div className="App">
      <div className="header">
        <u>
          <h1> To Do App</h1>
        </u>
        <TodoContainer />
      </div>
    </div>
  );
};

export default App;

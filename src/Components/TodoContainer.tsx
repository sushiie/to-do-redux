import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addToDo, setTodos } from "./actions/toDoActions";
import TodoItem from "./TodoItem";

export interface IToDoItem {
  title: string;
  id: number;
  status: "completed" | "incomplete";
}

const TodoContainer: React.FC = (props: any) => {
  const { addToDo, todoItems, setTodos } = props;
  const [newTodoText, setNewTodoText] = useState("");
  const [loader, setLoader] = useState<boolean>(false);
  const dataUrl =
    "https://my-json-server.typicode.com/sushiie/mock-todo-backend/data";

  const fetchData = useCallback(() => {
    setLoader(true);
    axios
      .get(dataUrl)
      .then(({ data }) => {
        if (data.length) {
          setTodos(data);
        }
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddition = () => {
    const newTodo: IToDoItem = {
      title: newTodoText,
      id: new Date().getTime(),
      status: "incomplete",
    };
    setNewTodoText("");
    addToDo(newTodo);
  };

  return (
    <div className="container">
      <input
        type="text"
        className="input-box"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && e.shiftKey === false) {
            e.preventDefault();
            handleAddition();
          }
        }}
      />
      <button className={"add-btn"} onClick={() => handleAddition()}>
        Add ToDo Item
      </button>

      <h3>List items to do</h3>

      <div className="list-container">
        {loader ? (
          <span className="no-items">Loading data...</span>
        ) : (
          <>
            {todoItems.length > 0 ? (
              todoItems.map((todoItem: IToDoItem) => (
                <div key={todoItem.id} className="list-item">
                  <TodoItem todoItem={todoItem} />
                </div>
              ))
            ) : (
              <span className="no-items">You are free, no items to do..</span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    todoItems: state.todoItems,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  addToDo: (toDo: IToDoItem) => dispatch(addToDo(toDo)),
  setTodos: (toDos: IToDoItem[]) => dispatch(setTodos(toDos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);

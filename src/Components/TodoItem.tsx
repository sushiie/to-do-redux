import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { deleteTodo, updateStatus } from "./actions/toDoActions";
import { IToDoItem } from "./TodoContainer";

interface ItemInterface {
  todoItem: IToDoItem;
}

const TodoItem: React.FC<ItemInterface> = (props: any) => {
  const { todoItem, updateStatus, deleteTodo } = props;

  const handleRemove = (id: number) => {
    deleteTodo(id);
  };

  const handleToggleStatus = (todoId: number) => {
    updateStatus({
      id: todoId,
      status: todoItem.status === "completed" ? "incomplete" : "completed",
    });
  };

  return (
    <>
      <div className="item-label">{todoItem.title}</div>
      <div className="action-block">
        <div className="status-block">
          <div> {`Status: `}</div>
          <div className={`${todoItem.status} status-label`}>
            {todoItem.status}
          </div>
        </div>

        <div className="actions">
          <label
            className="remove-btn"
            onClick={() => handleRemove(todoItem.id)}
          >
            Remove ToDo
          </label>
          {todoItem.status === "completed" ? (
            <label
              className="incomplete action-btn"
              onClick={() => handleToggleStatus(todoItem.id)}
              title="Mark Completed"
            >
              Mark Incomplete
            </label>
          ) : (
            <label
              className="completed action-btn"
              onClick={() => handleToggleStatus(todoItem.id)}
              title="Mark Incomplete"
            >
              {" "}
              Mark Completed
            </label>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  todoItems: state.todoItems,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateStatus: (payload: { id: number; status: string }) =>
    dispatch(updateStatus(payload)),
  deleteTodo: (todoID: number) => dispatch(deleteTodo(todoID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);

export const addToDo = (toDoItem) => ({
  type: "ADD_TODO",
  payload: toDoItem,
});

export const updateStatus = (actionData) => ({
  type: "UPDATE_TODO",
  payload: actionData,
});

export const setTodos = (actionData) => ({
  type: "SET_TODOS",
  payload: actionData,
});

export const deleteTodo = (todoID) => ({
  type: "DELETE_TODO",
  payload: todoID,
});



const initState = {
  todoItems: [],
};

export const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todoItems: state.todoItems.concat(action.payload) };
    case "UPDATE_TODO":
      const itemToUpdateIndex = state.todoItems.findIndex(
        (item) => item.id === action.payload.id
      );
      const updatedItems = [...state.todoItems];
      if (itemToUpdateIndex > -1) {
        updatedItems[itemToUpdateIndex].status = action.payload.status;
      }
      return { ...state, todoItems: updatedItems };

    case "SET_TODOS":
      return { ...state, todoItems: action.payload };
    case "DELETE_TODO":
      return {
        ...state,
        todoItems: state.todoItems.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

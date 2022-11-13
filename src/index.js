import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getError } from "./store/errors";
import configureStore from "./store/store";
import {
  titleChanged,
  taskDeleted,
  completeTask,
  loadTasks,
  getTasks,
  getTasksLoadingStatus,
  createTask,
} from "./store/task";
const store = configureStore();
let NUMB = 201;
const App = (params) => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };
  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };
  const taskForCreate = {
    title: `Created task ${NUMB}`,
    completed: false,
  };
  if (isLoading) {
    return <h1>In Loading</h1>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <>
      <h1>App</h1>
      <ul>
        <button onClick={() => (NUMB++, dispatch(createTask(taskForCreate)))}>
          New task
        </button>
        <hr />
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              Comlete
            </button>
            <button onClick={() => changeTitle(el.id)}>New Title</button>
            <button onClick={() => deleteTask(el.id)}>Delete</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

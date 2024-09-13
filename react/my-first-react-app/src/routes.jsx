import Profile from "./Profile";
import App from "./App";
import ErrorPage from "./ErrorPage";
import TodoList from "./TodoList";

const router = [
  { path: "/", element: <App />, errorElement: <ErrorPage /> },
  {
    path: "profile",
    children: [
      { index: true, element: <Profile /> },
      { path: ":name", element: <Profile /> },
    ],
  },
  { path: "/todolist", element: <TodoList /> },
];

export default router;

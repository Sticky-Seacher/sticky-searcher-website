import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import { UserIdProvider } from "./context/userIdContext";
import Initial from "./shared/Initial";
import Login from "./shared/Login";

const queryClient = new QueryClient();

function App() {
  return (
    <UserIdProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute element={<Home />} />}
          />
          <Route
            path="/Initial"
            element={<Initial />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
        </Routes>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </UserIdProvider>
  );
}

export default App;

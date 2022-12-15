import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Auth, AdminView, AddOrUpdate } from "../views";
import RequireAuth from "../components/RequireAuth";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="signUp" element={<Auth type="signUp" />} />
          <Route path="signIn" element={<Auth type="signIn" />} />

          {/* Protected routes */}
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="adminView" element={<AdminView />} />
            <Route path="add" element={<AddOrUpdate type="add" />} />
            <Route
              path="edit/:productId"
              element={<AddOrUpdate type="edit" />}
            />
          </Route>

          {/* Anything else */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import "./App.css";
import { Routes, Route } from "react-router-dom";
import  HomePage from "./pages/home";
import Main from "./pages/mainApp";
import ProfilePage from "./pages/profile";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <HomePage />
            </div>
          }
        />
        <Route
          path="/app"
          element={
            <div>
              <Main />
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <div>
              <ProfilePage />
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;

import { Routes, Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ProblemForm from "./pages/ProblemForm";
import ProblemList from "./pages/ProblemList";
import ProblemDetails from "./pages/ProblemDetails";
import Home from "./pages/Home";
import Footer from "./components/Footer"; 


function App() {

  return (
    <div className="min-h-screen bg-gray-150">
    <Navbar/>
    <div className="container mx-auto p-4">
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submit"
          element={
            <ProtectedRoute>
              <ProblemForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/problems"
          element={
            <ProtectedRoute>
              <ProblemList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/problems/:id"
          element={
            <ProtectedRoute>
              <ProblemDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
    <Footer />
    </div>
  );
}

export default App;

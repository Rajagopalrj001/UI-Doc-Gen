import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DocumentationGenerator from "./DocumentationGenerator";
import ImageGeneration from "./ImageGeneration";
import Signup from "./Signup";
import Login from "./login";
import Home from "./Home";
import Nav from "./Nav";
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("username");
        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, []);

    return (
            <div>
  {(user)?
                <Nav user={user} setUser={setUser} />:""
  }
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
                    <Route path="/documentation" element={<DocumentationGenerator />} />
                    <Route path="/image-generation" element={<ImageGeneration />} />
                </Routes>
            </div>
    );
}

export default App;

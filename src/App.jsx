import { Routes, Route } from "react-router-dom";

import Login from "./routes/Login";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";

const App = () => {
    const { user } = useContext(UserContext);

    if (user === false) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Navbar />
            <h1>APP</h1>
            <Routes>
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Home />
                        </RequireAuth>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
};

export default App;

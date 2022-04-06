import { Routes, Route } from "react-router-dom";

import Login from "./routes/Login";
import Home from "./routes/Home";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";

const App = () => {
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
            </Routes>
        </>
    );
};

export default App;

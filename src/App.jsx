import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";

import Login from "./routes/Login";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Perfil from "./routes/Perfil";
import NotFound from "./routes/NotFound";

import LayoutContainerForm from "./components/layouts/LayoutContainerForm";
import LayoutRequireAuth from "./components/layouts/LayoutRequireAuth";
import Navbar from "./components/Navbar";

const App = () => {
    const { user } = useContext(UserContext);

    if (user === false) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<LayoutRequireAuth />}>
                    <Route index element={<Home />} />
                    <Route path="perfil" element={<Perfil />} />
                </Route>

                <Route path="/" element={<LayoutContainerForm />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;

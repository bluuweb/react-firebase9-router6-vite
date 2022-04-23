import { UserContext } from "./context/UserProvider";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import NotFound from "./routes/NotFound";
import Register from "./routes/Register";
import Perfil from "./routes/Perfil";
import Login from "./routes/Login";
import Home from "./routes/Home";

import LayoutContainerForm from "./components/layouts/LayoutContainerForm";
import LayoutRequireAuth from "./components/layouts/LayoutRequireAuth";
import LayoutRedirect from "./components/layouts/LayoutRedirect";
// import Navbar from "./components/Navbar";
import NavbarSuper from "./components/NavbarSuper";

const App = () => {
    const { user } = useContext(UserContext);

    if (user === false) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {/* <Navbar /> */}
            <NavbarSuper />
            <Routes>
                <Route path="/" element={<LayoutRequireAuth />}>
                    <Route index element={<Home />} />
                    <Route path="perfil" element={<Perfil />} />
                </Route>

                <Route path="/" element={<LayoutContainerForm />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route path="/:nanoid" element={<LayoutRedirect />}>
                    <Route index element={<NotFound />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;

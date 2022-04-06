import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
const Navbar = () => {
    const { user, setUser } = useContext(UserContext);

    return (
        <div>
            {user ? (
                <>
                    <NavLink to="/">Inicio</NavLink>
                    <button onClick={() => setUser(false)}>Logout</button>
                </>
            ) : (
                <NavLink to="/login">Login</NavLink>
            )}
        </div>
    );
};

export default Navbar;

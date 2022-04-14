import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

const Login = () => {
    const { loginUser } = useContext(UserContext);
    const navegate = useNavigate();
    const { required, patternEmail, minLength, validateTrim } = formValidate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        defaultValues: {
            email: "bluuweb1@test.com",
            password: "123123",
        },
    });

    const onSubmit = async ({ email, password }) => {
        try {
            await loginUser(email, password);
            navegate("/");
        } catch (error) {
            const { code, message } = erroresFirebase(error.code);
            setError(code, { message });
        }
    };

    return (
        <>
            <Title text="Login" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    label="Ingresa tu correo"
                    type="email"
                    placeholder="Ingrese email"
                    {...register("email", {
                        required,
                        pattern: patternEmail,
                    })}
                    error={errors.email}
                >
                    <FormError error={errors.email} />
                </FormInput>

                <FormInput
                    label="Ingresa contraseña"
                    type="password"
                    placeholder="Ingrese Password"
                    {...register("password", {
                        minLength,
                        validate: validateTrim,
                    })}
                    error={errors.password}
                >
                    <FormError error={errors.password} />
                </FormInput>
                <Button text="Login" type="submit" />
            </form>
        </>
    );
};

export default Login;

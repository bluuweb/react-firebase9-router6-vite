import { forwardRef } from "react";

const FormInput = forwardRef(
    ({ type, placeholder, onChange, onBlur, name, children }, ref) => {
        return (
            <>
                <input
                    type={type}
                    placeholder={placeholder}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                />
                {children}
            </>
        );
    }
);

export default FormInput;

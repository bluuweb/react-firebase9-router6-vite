import { forwardRef, useRef } from "react";

const InputText = forwardRef((props, ref) => {
    return (
        <>
            <input type="text" ref={ref} />
        </>
    );
});

const ExampleRef = () => {
    const inputFocus = useRef(null);

    const handleButtonClick = () => {
        console.log("me diste click");
        inputFocus.current.focus();
    };

    return (
        <>
            <InputText ref={inputFocus} />
            <button onClick={handleButtonClick}>Click ref</button>
        </>
    );
};
export default ExampleRef;

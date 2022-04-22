import { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { formValidate } from "../utils/formValidate";
import { useForm } from "react-hook-form";

import Button from "../components/Button";
import Title from "../components/Title";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import { erroresFirebase } from "../utils/erroresFirebase";

const Home = () => {
    const [copy, setCopy] = useState({ propiedadX: true });
    const { required, patternURL } = formValidate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        resetField,
        setError,
        setValue,
    } = useForm();

    const { loading, data, error, getData, addData, deleteData, updateData } =
        useFirestore();
    const [newOriginID, setNewOriginID] = useState();

    useEffect(() => {
        console.log("getData");
        getData();
    }, []);

    if (loading.getData) return <p>Loading data getData...</p>;
    if (error) return <p>{error}</p>;

    const onSubmit = async ({ url }) => {
        try {
            if (newOriginID) {
                await updateData(newOriginID, url);
                setNewOriginID("");
            } else {
                await addData(url);
            }
            resetField("url");
        } catch (error) {
            const { code, message } = erroresFirebase(error.code);
            setError(code, { message });
        }
    };

    const handleClickDelete = async (nanoid) => {
        console.log("click delete");
        await deleteData(nanoid);
    };

    const handleClickEdit = (item) => {
        setValue("url", item.origin);
        setNewOriginID(item.nanoid);
    };

    const pathURL = window.location.href;

    const handleClickCopy = async (nanoid) => {
        await navigator.clipboard.writeText(window.location.href + nanoid);
        console.log("copiado");
        setCopy({ [nanoid]: true });
    };

    return (
        <>
            <Title text="Home Administrator URLs" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    label="Ingresa tu URL"
                    type="text"
                    placeholder="https://bluuweb.org"
                    {...register("url", {
                        required,
                        pattern: patternURL,
                    })}
                    error={errors.url}
                >
                    <FormError error={errors.url} />
                </FormInput>

                {newOriginID ? (
                    <Button
                        type="submit"
                        text="EDIT URL"
                        color="yellow"
                        loading={loading.updateData}
                    />
                ) : (
                    <Button
                        type="submit"
                        text="ADD URL"
                        color="blue"
                        loading={loading.addData}
                    />
                )}
            </form>

            {data.map((item) => (
                <div
                    key={item.nanoid}
                    className="p-6 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 mb-2"
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {pathURL}
                        {item.nanoid}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {item.origin}
                    </p>
                    <div className="flex space-x-2">
                        <Button
                            type="button"
                            text="Delete"
                            color="red"
                            loading={loading[item.nanoid]}
                            onClick={() => handleClickDelete(item.nanoid)}
                        />
                        <Button
                            type="button"
                            text="Edit"
                            color="yellow"
                            onClick={() => handleClickEdit(item)}
                        />
                        <Button
                            type="button"
                            text={copy[item.nanoid] ? "Copied" : "Copy"}
                            color="blue"
                            onClick={() => handleClickCopy(item.nanoid)}
                        />
                    </div>
                </div>
            ))}
        </>
    );
};

export default Home;

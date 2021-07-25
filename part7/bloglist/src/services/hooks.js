import { useState } from "react";

export const useField = (type, initialVal = "") => {
    const [value, setValue] = useState(initialVal);

    const onChange = event => {
        setValue(event.target.value);
    };

    const reset = () => {
        setValue(initialVal);
    };

    return {
        type,
        value,
        reset,
        onChange
    };
};
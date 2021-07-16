import { useState } from "react";

export const useField = (name, initialValue = "") => {
    const [value, setValue] = useState(initialValue);

    const onChange = e => {
        setValue(e.target.value);
    };

    const reset = () => {
        setValue(initialValue);
    };

    return {
        name,
        value,
        onChange,
        reset
    };
};
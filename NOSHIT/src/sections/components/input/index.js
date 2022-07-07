import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

import "./index.scss";

export default function Input(props) {
    const [value, setValue] = useState(props?.value);
    return (
        <div id={props.id} className="input-container">
            <input
                value={value}
                placeholder={props?.placeholder}
                onChange={(e) => {
                    props?.changeHandle(e.target.value);
                    setValue(e.target.value);
                }}
            />
            {value && <CloseIcon fontSize="small" onClick={() => {
                setValue("");
                props?.changeHandle("");
            }} />}
        </div>
    );
}
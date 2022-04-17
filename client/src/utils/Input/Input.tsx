import React, {ChangeEvent, FC} from 'react';
import './Input.css'

type InputPropsType = {
    type: string ,
    placeholder: string,
    value: string,
    setValue: (value: string) => void,
}

const Input: FC<InputPropsType> = (props) => {
    return (
        <input
            value={props.value}
            type={props.type}
            onChange={(event:ChangeEvent<HTMLInputElement>) => props.setValue(event.target.value)}
            placeholder={props.placeholder}/>
    );
};

export default Input;
import { useState, useContext } from "react";
import styles from '../style/addTodo.module.css';
import { ArrContext } from "../context/ArrayContext";

export default function AddTodo({ onAdd }) {
    const [input, setInput] = useState('');
    const { arr } = useContext(ArrContext);


    function saveInput(e) {
        setInput(e.target.value);
    }

    function submit(e) {
        if (e.key === 'Enter') {
            const liId = arr.length + 1;
            if (input.trim() !== '') {
                onAdd({ id: liId, content: input.trim(), completed: false });
            } else return;
            setInput('');
        }
    }

    return (
        <div className={styles.form}>
            <input
                className={styles.input}
                type='text'
                placeholder='Enter your todo'
                value={input}
                onChange={saveInput}
                onKeyDown={(e) => submit(e)}
            ></input>
        </div>
    )
}
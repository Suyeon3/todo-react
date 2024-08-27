import styles from '../style/todoItem.module.css';
import { useState, useContext, useRef, useEffect } from 'react';
import { ArrContext } from '../context/ArrayContext';

export default function TodoListItem({ todo }) {
    const { setArr } = useContext(ArrContext);
    const [editIsOn, setEditIsOn] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(todo.content);
    const [checked, setChecked] = useState(todo.completed || false);
    const checkboxRef = useRef(null);

    function saveCurrentTodo(e) {
        setCurrentTodo(e.target.value);
    }

    function editToggle() {
        setEditIsOn((prev) => !prev);
        console.log('dfassd')
    }

    function edit(e) {
        if (e.key === 'Enter') {
            setArr((prevArr) => [...prevArr.map((item) => {
                if (item.id === todo.id) {
                    return {
                        ...item,
                        content: currentTodo
                    }
                }
                return item;
            })]);
            editToggle();
        }
    }

    function handleDelete() {
        setArr((prevArr) => [...prevArr.filter((item) => item.id !== todo.id)]);
    }

    function handleComplete() {
        const checkBox = checkboxRef.current;
        setArr((prevArr) => [...prevArr.map((item) => {
            if (item.id === todo.id) {
                return {
                    ...item,
                    completed: checkBox.checked
                }
            }
            return item;
        })]);
        setChecked(!checked);
    }

    return (
        <li className={styles.TodoListItem}>
            <input
                type='checkBox'
                ref={checkboxRef}
                onClick={handleComplete}
            />
            <span className={checked ? `${styles.checkedTodo}` : `${styles.uncheckedTodo}`}>{currentTodo}</span>
            {editIsOn &&
                    <input
                        className={styles.editField}
                        value={currentTodo}
                        onChange={(e) => saveCurrentTodo(e)}
                        onKeyDown={(e) => edit(e)}
                    />
            }
            <button className={styles.edit} onClick={editToggle}>수정</button>
            <button className={styles.remove} onClick={handleDelete}>삭제</button>
        </li>
    )
}
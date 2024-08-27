import styles from '../style/todoItem.module.css';
import { useState, useContext, useRef } from 'react';
import { ArrContext } from '../context/ArrayContext';

export default function TodoListItem({ todo }) {
    const { setArr } = useContext(ArrContext);
    const [editIsOn, setEditIsOn] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(todo.content);
    const [checked, setChecked] = useState({ isCompleted: false });
    const checkboxRef = useRef(null);

    function saveCurrentTodo(e) {
        setCurrentTodo(e.target.value);
    }

    function editToggle() {
        setEditIsOn(!editIsOn);
    }

    function edit(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            setArr((prevArr) => [...prevArr.map((item) => {
                if (item.id === todo.id) {
                    return {
                        ...item,
                        content: currentTodo
                    }
                }
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
        })]);
        setChecked({ isCompleted: !checked.isCompleted });
    }

    return (
        <li className={styles.TodoListItem}>
            <input
                type='checkBox'
                ref={checkboxRef}
                onClick={handleComplete}
            />
            <span className={checked.isCompleted?`${styles.checkedTodo}`:`${styles.uncheckedTodo}`}>{currentTodo}</span>
            {editIsOn &&
                <form>
                    <input
                        className={styles.editField}
                        value={currentTodo}
                        onChange={(e) => saveCurrentTodo(e)}
                        onKeyDown={(e) => edit(e)}
                    />
                </form>
            }
            <button className={styles.edit} onClick={editToggle}>수정</button>
            <button className={styles.remove} onClick={handleDelete}>삭제</button>
        </li>
    )
}
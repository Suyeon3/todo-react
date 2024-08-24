import styles from '../style/todoItem.module.css';
import { useState, useContext } from 'react';
import { ArrContext } from '../context/ArrayContext';

export default function TodoListItem({ todo }) {
    const { arr, setArr } = useContext(ArrContext);
    const [editIsOn, setEditIsOn] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(todo.content);

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

    return (
        <li className={styles.TodoListItem}>
            <div className={styles.checkBox}></div>
            {currentTodo}
            {editIsOn &&
                <form>
                    <input
                        className={styles.editField}
                        value={currentTodo}
                        onChange={(e) => saveCurrentTodo(e)}
                        onKeyDown={(e) => edit(e)}
                    >
                    </input>
                </form>
            }
            <div className={styles.edit} onClick={editToggle}>수정</div>
            <div className={styles.remove} onClick={handleDelete}>삭제</div>
        </li>
    )
}
import styles from '../style/todoItem.module.css';

export default function TodoListItem({ todo }) {
    return (
        <li className={styles.TodoListItem}>
            <div className={styles.checkBox}></div>
            {todo}
            <div className={styles.edit}></div>
            <div className={styles.remove}></div>
        </li>
    )
}

export default function Filter({ onFilter }) {
    const status = ['All', 'Active', 'Completed']

    const handleFilter = (e) => onFilter(e.target.value);

    return (
        <ul>
            {status.map((state) =>
                <li><button onClick={handleFilter} value={state}>{state}</button></li>
            )}
        </ul>
    )
}
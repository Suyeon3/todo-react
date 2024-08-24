import { createContext, useState } from "react";

export const ArrContext = createContext();

export function ArrProvider({children}) {
    const [arr, setArr] = useState([]);
    
    const todos = 'TODOS';
    function save(array) {
        localStorage.setItem(todos, JSON.stringify(array));
    }

    return (
        <ArrContext.Provider value={{arr, setArr, save}}>
            {children}
        </ArrContext.Provider>
    )
}
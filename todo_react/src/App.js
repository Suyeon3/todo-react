import TodoList from './component/TodoList';
import { ArrProvider } from './context/ArrayContext';

function App() {
  return (
    <>
      <ArrProvider>
        <TodoList/>
      </ArrProvider>
    </>
  );
}

export default App;

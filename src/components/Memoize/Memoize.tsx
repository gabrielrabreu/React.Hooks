import { memo, useCallback, useMemo, useState } from "react";

interface ITodosProps {
  todos: string[];
  addTodo: () => void;
}

const _Todos: React.FC<ITodosProps> = ({ todos, addTodo }) => {
  console.log("todos render");
  return (
    <>
      <h2>My Todos</h2>
      {todos.map((todo, index) => {
        return <p key={index}>{todo}</p>;
      })}
      <button onClick={addTodo}>Add Todo</button>
    </>
  );
};

const Todos = memo(_Todos);

const expensiveCalculation = (num: number) => {
  console.log("Calculating...");
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState(["Todo"]);
  const calculation = useMemo(() => expensiveCalculation(count), [count]);

  const increment = () => {
    setCount((c) => c + 1);
  };

  const addTodo = useCallback(() => {
    setTodos((t) => [...t, "New Todo"]);
  }, [todos]);

  return (
    <>
      <Todos todos={todos} addTodo={addTodo} />
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
        <h2>Expensive Calculation</h2>
        {calculation}
      </div>
    </>
  );
};

export default App;

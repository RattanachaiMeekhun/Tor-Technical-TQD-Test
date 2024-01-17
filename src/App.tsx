import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import dayjs from "dayjs";

function App() {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState<any[]>([]);
  const [loadCount, setLoadCount] = useState(1);

  useEffect(() => {
    const local = sessionStorage.getItem("todos");
    if (local) {
      const todos = JSON.parse(local);
      if (todos.length > 0) {
        setTodo([...JSON.parse(local)]);
      }
    }
  }, []);

  useEffect(() => {
    const local = sessionStorage.getItem("todos");

    if (JSON.stringify(todo) !== local) {
      sessionStorage.setItem("todos", JSON.stringify(todo));
    }
  }, [todo]);

  const handleDelete = (id: number) => {
    setTodo([...todo.filter((e) => e.id !== id)]);
  };

  const handleClick = () => {
    let _todo: any[] = [...todo];
    const item = {
      id: todo.length,
      text: text,
      createdDate: dayjs().format("DD/MM/YYYY hh:mm:ss a"),
    };
    _todo.unshift(item);
    setText("");
    setTodo([..._todo]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: 10 }}>
      <div style={{ display: "flex", flexDirection: "row", columnGap: 10 }}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button
          onClick={handleClick}
          style={{ background: "#8cdf85", border: "1px solid #00ff0a" }}
        >
          Add
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: 10,
        }}
      >
        {todo.map((e, idx) => {
          if (idx < loadCount * 5) {
            return (
              <div
                style={{
                  width: "100%",
                  height: 50,
                  border: "1px solid",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  padding: 10,
                }}
              >
                <div
                  style={{
                    background: "#dd5858",
                    width: 25,
                    height: 25,
                    borderRadius: "50%",
                    position: "absolute",
                    top: -10,
                    right: -10,
                  }}
                  onClick={() => {
                    handleDelete(e.id);
                  }}
                >
                  X
                </div>
                <span>{e.text}</span>
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                  }}
                >
                  {e.createdDate}
                </span>
              </div>
            );
          } else {
            <></>;
          }
        })}
        <a onClick={() => setLoadCount(loadCount + 1)}>Load more</a>
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@arco-design/web-react";
// import "@arco-design/web-react/dist/css/arco.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <Button type="primary" onClick={() => setCount(count => count + 1)}>
        hello arco
      </Button>
      <p> count is {count}</p>
    </>
  );
}

export default App;

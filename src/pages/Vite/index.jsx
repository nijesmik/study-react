import { useState } from "@lib/hooks.js";

const Vite = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" className="logo" alt="Vite logo" />
      </a>
      <h1>Hello Vite!</h1>
      <div className="card">
        <button
          id="counter"
          type="button"
          onClick={() => setCounter((prev) => prev + 1)}
        >
          count is {counter}
        </button>
      </div>
      <p className="read-the-docs">Click on the Vite logo to learn more</p>
    </div>
  );
};

export default Vite;

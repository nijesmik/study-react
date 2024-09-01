const Vite = () => {
  // TODO: useState 구현
  let counter = 0;
  const setCounter = () => {
    counter++;
    console.log(counter);
  };

  return (
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" className="logo" alt="Vite logo" />
      </a>
      <h1>Hello Vite!</h1>
      <div className="card">
        <button id="counter" type="button" onClick={setCounter}>
          count is {counter}
        </button>
      </div>
      <p className="read-the-docs">Click on the Vite logo to learn more</p>
    </div>
  );
};

export default Vite;

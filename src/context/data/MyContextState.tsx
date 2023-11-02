import React, { ReactNode, useEffect, useState } from "react";
import MyContext from "./MyContext";

interface MyStateProps {
  children: ReactNode;
}

function MyState(props: MyStateProps): JSX.Element {
  const [name, setName] = useState("Heysel");
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  return (
    <MyContext.Provider
      value={{
        name,
        mode,
        toggleMode
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;

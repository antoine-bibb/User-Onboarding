import React from "react";
import Form from "./component/Form";
import styled from "styled-components";
import "./App.css";

const AppContainer = styled.div`
  width: 80%;
  margin: auto;
`;

function App() {
  return (
    <AppContainer>
      <Form />
    </AppContainer>
  );
}

export default App;

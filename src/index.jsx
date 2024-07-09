import { createRoot } from "react-dom/client";

import { MainView } from "./Components/main-view/main-view";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.scss";
import { Container } from "react-bootstrap";


const MyFlixApplication = () => {
  return (
    <Container>
      <MainView />
    </Container>

  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication />);

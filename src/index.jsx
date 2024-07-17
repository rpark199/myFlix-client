import { createRoot } from "react-dom/client";

import { MainView } from "./Components/main-view/main-view";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.scss";
import { Container } from "react-bootstrap";

import { store } from "./redux/store";
import { Provider } from "react-redux";


const MyFlixApplication = () => {
  return (
    <Provider store={store}>
      <Container>
        <MainView />
      </Container>
    </Provider>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication />);

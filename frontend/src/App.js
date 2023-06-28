import Layout from "./Components/Layout";
import { Container } from "reactstrap";
import { BrowserRouter as Router } from "react-router-dom";
import "./scss/style.scss";

function App() {
  return (
    <Router>
      <Container fluid className="vh-100 vw-100 overflow-hidden">
        <Layout />
      </Container>
    </Router>
  );
}

export default App;

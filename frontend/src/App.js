import Layout from "./components/Layout";
import { Container } from "reactstrap";
import "./scss/style.scss";

function App() {
  return (
    <Container fluid className="vh-100 vw-100 overflow-hidden">
      <Layout />
    </Container>
  );
}

export default App;

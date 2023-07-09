import { Container } from "reactstrap";
import "./scss/style.scss";
import Layout from "./Components/Layout";

function App() {
  return (
    <Container fluid className="vh-100 vw-100 overflow-hidden">
      <Layout />
    </Container>
  );
}

export default App;

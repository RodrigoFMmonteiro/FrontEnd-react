import { Nav } from "react-bootstrap";
import { Cabecalho } from "./Cabecalho";
import { Link } from "react-router-dom";

export default function Menu(props){
    return (
      <>
        <Cabecalho texto="Sistema de Gestão - Hotel"/>
        <Nav
          className="ms-5 mb-4"
          activeKey="/home"
          onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >

          <Nav.Item>
            <Nav.Link> <Link to="/">Início </Link></Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link> <Link to="/cadastroFunc">Cadastro de Produtos</Link></Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link> <Link to="/cadastroHospede">Hospede</Link></Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link> <Link to="/cadastroTelefone">Telefone</Link></Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link> <Link to="/cadastroConsumo">Consumo</Link></Nav.Link>
          </Nav.Item>

        </Nav>
      </>
      );
}
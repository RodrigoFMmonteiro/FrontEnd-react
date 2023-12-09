import Menu from "../Templates/Menu";
import { Container } from "react-bootstrap";

export default function Pagina(props){
    return (
        <div>
            <Menu/>
            <Container>
                {props.children}
            </Container>
        </div>
    );
}
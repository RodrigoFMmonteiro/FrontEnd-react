import { Alert } from "react-bootstrap";
import Pagina from "./Pagina";

export default function Pagina404(props){
    return (
        <Pagina>
            <Alert className="text-center" variant="danger">
                <Alert.Heading>Página não encontrada</Alert.Heading>
            </Alert>
        </Pagina>
    );
}
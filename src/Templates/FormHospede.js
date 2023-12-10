import { Container, FormControl, FormLabel, FormCheck } from "react-bootstrap";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { urlBase } from "../utilitarios/definicoes";
import CaixaSelecao from "../utilitarios/caixaSelecao";
import TabelaTelefones from "../utilitarios/tabelaTelefones";

const boxcadall_style = {
    padding: '5px',
    borderRadius: '10px',
    border: '3px solid black',
    height: '700px',
}

export default function FormHospede(props){

    const [validado, setValidacao] = useState(false);
    const [hospede, sethospede] = useState(props.hospede);
    const [telefoneSelecionado, settelefoneSelecionado] = useState({});
    const [listaTelefones, setListaTelefones] = useState([]);
    const [telefone, setTelefone] = useState(props.hospedeEmEdicao);

    function manipulaMudanca(e){
        const elemForm = e.currentTarget;
        const id = elemForm.id;
        const valor = elemForm.value;
        setTelefone({...telefone, [id]: valor });
    }

    function manipulaSubmissao(evento){
        const form = evento.currentTarget;
        if (form.checkValidity()){ 
            if (!props.modoEdicao){
                fetch(urlBase+"/hospedes",{
                    method:"POST",
                    headers:{"Content-Type": "application/json"},
                    body: JSON.stringify(hospede)
                    }).then((resposta)=>{
                    return resposta.json();  
                    }).then((dados)=>{
                    if (dados.status){
                        props.setModoEdicao(false);
                        let hospedes = props.listahospede;
                        hospedes.push(hospede);
                        props.sethospede(hospedes);
                        props.exibirTabela(true);  
                    }
                    window.alert(dados.mensagem);
                }).catch((erro)=>{
                    window.alert("Erro ao executar a requisição: " + erro.message);
                })
            }
            else{

                fetch(urlBase+"/hospedes",{
                    method:"PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(hospede)
                }).then(()=>{
                     props.setModoEdicao(false);
                    alert("Atualizado com sucesso!");
                    props.exibirTabela(true);
                }).then(()=>{
                    window.location.reload();

                });
            }
            setValidacao(false);
        }
        else{
            setValidacao(true);
        }  
        evento.preventDefault();
        evento.stopPropagation();
    }

    return(

        <div style={boxcadall_style}>
            <Container>
                <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>

            <h3 className="text-center mb-5">Cadastre ou edite um hospede</h3>
            <Row>
                <Col>
                    <FormLabel>ID</FormLabel>
                        <Form.Control
                            disabled
                            value={hospede.ID}
                            id="ID">
                        </Form.Control>
                </Col>
                <Col>
                    <Form.Label>Nome Completo</Form.Label>
                    <Form.Control
                        required 
                        type="text"
                        placeholder=""
                        value={hospede.nome}
                        id="nome"
                        onChange={manipulaMudanca} />
                    <Form.Control.Feedback type="invalid">Insira um nome</Form.Control.Feedback>
                </Col>

                <Col>
                    <Form.Label>CPF/CNPJ</Form.Label>
                    <Form.Control
                        required 
                        type="text"
                        placeholder=""
                        value={hospede.cpf}
                        id="doc"
                        onChange={manipulaMudanca} />
                    <Form.Control.Feedback type="invalid">Insira o CPF/CNPJ</Form.Control.Feedback>
                </Col>
                         
                </Row>

                <Row className="mt-4">
                <Col>
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                        //value={'endereco'}
                        onChange={manipulaMudanca}
                        required 
                        type="text" 
                        value={hospede.endereco}  
                        id="endreco"/>
                    <Form.Control.Feedback type="invalid">Insira um veículo</Form.Control.Feedback>
                </Col>
                <Col>
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        //value={'email'}
                        onChange={manipulaMudanca}
                        required 
                        type="text"
                        value={hospede.email}   
                        id="email"/>
                    <Form.Control.Feedback type="invalid">Insira um veículo</Form.Control.Feedback>
                </Col>

                <Col>
                    <FormLabel>Selecione pelo menos um telefone</FormLabel>
                    <CaixaSelecao
                        enderecoDado={urlBase+'/telefoneHospedes'}
                        campoChave={'ID_hospede'}
                        campoExibicao={'numero_telefone'}
                        funcaoSelecao={settelefoneSelecionado}/>
                
                </Col>
                
                </Row>
                <Container className="mt-4">
                    <Row>
                        <Col>
                            <FormLabel>Código</FormLabel>
                            <FormControl
                            className="mb-3"
                            value={telefoneSelecionado.ID}
                            type="text"
                            id="codigo"
                            disabled/>
                        </Col>

                        <Col>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl
                            className="mb-3"
                            value={telefoneSelecionado.telefone}
                            type="text"
                            id="telefone"
                            disabled/>
                        </Col >

                        <Col>
                            <Button className="mt-4" onClick={()=>{
                                    const item = {
                                        ID: telefoneSelecionado.ID,
                                        telefone: telefoneSelecionado.telefone,                                      
                                    }
                                    setListaTelefones([...listaTelefones, item]);
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-plus-fill" viewBox="0 0 16 16">
                                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z"/>
                                    </svg>
                            </Button>

                        </Col>
                    </Row>
                    <Row>
                        <TabelaTelefones
                            listaTelefones={listaTelefones}
                            setTelefone={setTelefone}
                            dados={telefone}
                            setListaTelefones={setListaTelefones}   />
                    </Row>
                </Container>
                
                <Button className="mt-3" variant="primary" type="submit"> Cadastrar</Button>
                {' '}
                <Button className="mt-3" variant="dark" type="button" onClick={()=>{
                    props.exibirTabela(true);
                }}>Voltar</Button>
            </Form> 
            </Container>
        </div>
        )}

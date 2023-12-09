import { Container, FormControl, FormLabel, FormCheck } from "react-bootstrap";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { urlBase } from "../utilitarios/definicoes";
import ReactInputMask from "react-input-mask";


const boxcadall_style = {
    padding: '5px',
    borderRadius: '10px',
    border: '3px solid black',
    height: '450px',
}

export default function FormHotel(props){

    const [validado, setValidacao] = useState(false);
    const [hospede, sethospede] = useState(props.hospede);

    function manipulaMudanca(e){
        const elemForm = e.currentTarget;
        const id = elemForm.id;
        const valor = elemForm.value;
        sethospede({...hospede, [id]: valor });
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
                            //value={'ID'}
                            id="ID">
                        </Form.Control>
                </Col>
                <Col>
                    <Form.Label>Nome Completo</Form.Label>
                    <Form.Control
                        required 
                        type="text"
                        placeholder=""
                        //value={'nome'}
                        id="nome"
                        onChange={manipulaMudanca} />
                    <Form.Control.Feedback type="invalid">Insira um nome</Form.Control.Feedback>
                </Col>

                <Col>
                <Col>
                    <Form.Label>CPF/CNPJ</Form.Label>
                    <Form.Control
                        required 
                        type="text"
                        placeholder=""
                        //value={'nome'}
                        id="doc"
                        onChange={manipulaMudanca} />
                    <Form.Control.Feedback type="invalid">Insira o CPF/CNPJ</Form.Control.Feedback>
                </Col>
                
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
                        id="email"/>
                    <Form.Control.Feedback type="invalid">Insira um veículo</Form.Control.Feedback>
                </Col>

                <Col>
                    <Form.Label>WhatsApp</Form.Label>
                    <ReactInputMask
                    mask={'(99) 99999-9999'}
                    //value={'telefone'}
                    onChange={manipulaMudanca}>
                    {()=><FormControl
                            required
                            type="text"
                            id="whatsApp"
                        />}   
                    </ReactInputMask>
                    <Form.Control.Feedback type="invalid">Insira um WhatsApp</Form.Control.Feedback>
                
                </Col>

                
                </Row>
                
                <Button className="mt-3" variant="primary" type="submit"> Cadastrar</Button>
                {' '}
                <Button className="mt-3" variant="dark" type="button" onClick={()=>{
                    props.exibirTabela(true);
                }}>Voltar</Button>
            </Form> 
            </Container>
        </div>
        )}

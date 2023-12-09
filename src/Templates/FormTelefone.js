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

export default function FormTelefone(props){

    const [validado, setValidacao] = useState(false);
    const [telefone, settelefone] = useState(props.telefone);

    function manipulaMudanca(e){
        const elemForm = e.currentTarget;
        const id = elemForm.id;
        const valor = elemForm.value;
        settelefone({...telefone, [id]: valor });
    }

    function manipulaSubmissao(evento){
        const form = evento.currentTarget;
        if (form.checkValidity()){ 
            if (!props.modoEdicao){
                fetch(urlBase+"/hospedes",{
                    method:"POST",
                    headers:{"Content-Type": "application/json"},
                    body: JSON.stringify(telefone)
                    }).then((resposta)=>{
                    return resposta.json();  
                    }).then((dados)=>{
                    if (dados.status){
                        props.setModoEdicao(false);
                        let telefone = props.listatelefone;
                        telefone.push(telefone);
                        props.sethospede(telefone);
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
                    body: JSON.stringify(telefone)
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

            <h3 className="text-center mb-5">Cadastre ou edite um telefone</h3>
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
                    <Form.Label>Telefone</Form.Label>
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
                    <Form.Control.Feedback type="invalid">Insira um telefone</Form.Control.Feedback>
                
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

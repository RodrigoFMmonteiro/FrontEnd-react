import { Cabecalho } from "../Templates/Cabecalho";
import Pagina from "../paginas/Pagina";
import FormTelefone from "../Templates/FormTelefone";
import Tabelatelefone from "../tabelas/tabelaTelefone";
import { urlBase } from "../utilitarios/definicoes";
import { useState, useEffect} from "react";

export default function TelaCadTelefone(props){

    const [exibirTabela, setExibirTabela] = useState(true);
    const [telefone, setTelefone] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizando, setAtualizando] = useState(false);
    const [telefoneEmEdicao, settelefoneEdicao] = useState({
        ID: "",
        nome: "",
        endereco:"",
        telefone: "",
    })


    function edicaotelefone(telefone){
        setAtualizando(true);
        settelefoneEdicao(telefone);
        setExibirTabela(false);
        setModoEdicao(true);
    }

    function apagartelefone(telefone){
        if (window.confirm("Deseja excluir o telefone?")) {
            fetch(urlBase+"/telefones", {
                method:"DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(telefone)
            }).then((resposta)=>{
                return resposta.json();
            }).then((retorno)=>{
                if (retorno.mensagem){
                    alert("telefone excluído");
                    setExibirTabela(false);
                }
                else{
                    alert("Não foi possível excluir")
                }
            })
        }
    }

    useEffect(()=>{
        fetch(urlBase+"/telefones", {
            method:"GET"
        }).then((resposta)=>{
            return resposta.json();
        }).then((dados)=>{
            if (Array.isArray(dados)){
                setTelefone(dados);
            }
            else{

            }        
        });
    },[exibirTabela]);

    return(
        <>
            <Cabecalho texto="Cadastro de Telefones"/>
            <Pagina>
                {
                   exibirTabela ?
                   <Tabelatelefone  listatelefone={telefone} 
                                    setTelefone={setTelefone}
                                    exibirTabela={setExibirTabela}
                                    editartelefone={edicaotelefone}
                                    excluirtelefone={apagartelefone}
                                    setModoEdicao={setModoEdicao}
                                    edicaotelefone={settelefoneEdicao}/> 
                    :
                    <FormTelefone   listatelefone={telefone}
                                    settelefone={setTelefone} 
                                    exibirTabela={setExibirTabela}
                                    modoEdicao={modoEdicao}
                                    setModoEdicao={setModoEdicao}
                                    atualizando={atualizando}
                                    telefone={telefoneEmEdicao}
                                    edicaotelefone={settelefoneEdicao} />        
                }
                
            </Pagina>
        </>
    )
}
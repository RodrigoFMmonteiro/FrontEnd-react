import { Cabecalho } from "../Templates/Cabecalho";
import Pagina from "../paginas/Pagina";
import FormHospede from "../Templates/FormHospede";
import Tabelahospede from "../tabelas/tabelaHospede";
import { urlBase } from "../utilitarios/definicoes";
import { useState, useEffect} from "react";

export default function TelaCadhospede(props){

    const [exibirTabela, setExibirTabela] = useState(true);
    const [hospedes, setHospedes] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizando, setAtualizando] = useState(false);
    const [hospedeEmEdicao, sethospedeEdicao] = useState({
        ID: "",
        nome: "",
        endereco:"",
        telefone: "",
    })

    function edicaohospede(hospede){
        setAtualizando(true);
        sethospedeEdicao(hospede);
        setExibirTabela(false);
        setModoEdicao(true);
    }

    function apagarhospede(hospede){
        if (window.confirm("Deseja excluir o hospede?")) {
            fetch(urlBase+"/hospedes", {
                method:"DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(hospede)
            }).then((resposta)=>{
                return resposta.json();
            }).then((retorno)=>{
                if (retorno.mensagem){
                    alert("hospede excluído");
                    setExibirTabela(false);
                }
                else{
                    alert("Não foi possível excluir")
                }
            })
        }
    }

    useEffect(()=>{
        fetch(urlBase+"/hospedes", {
            method:"GET"
        }).then((resposta)=>{
            return resposta.json();
        }).then((dados)=>{
            if (Array.isArray(dados)){
                setHospedes(dados);
            }
            else{

            }        
        });
    },[exibirTabela]);

    return(
        <>
            <Cabecalho texto="Cadastro de Hospedes"/>
            <Pagina>
                {
                   exibirTabela ?
                   <Tabelahospede   listahospede={hospedes} 
                                    sethospede={setHospedes}
                                    exibirTabela={setExibirTabela}
                                    editarhospedetao={edicaohospede}
                                    excluirhospede={apagarhospede}
                                    setModoEdicao={setModoEdicao}
                                    edicaohospedet={sethospedeEdicao}/> 
                    :
                    <FormHospede    listahospede={hospedes}
                                    sethospede={setHospedes} 
                                    exibirTabela={setExibirTabela}
                                    modoEdicao={modoEdicao}
                                    setModoEdicao={setModoEdicao}
                                    atualizando={atualizando}
                                    hospede={hospedeEmEdicao}
                                    edicaohospedet={sethospedeEdicao} />        
                }
                
            </Pagina>
        </>
    )
}
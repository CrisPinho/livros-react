import React, { useState, useEffect } from 'react';
import { ControleLivro } from './controle/ControleLivros'; 
import { ControleEditora } from './controle/ControleEditora'; 

const controleLivro = new ControleLivro();
const controleEditora = new ControleEditora();

const LinhaLivro = (props) => {
    const { livro, excluir } = props;
    
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);
   

    return (
        <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>{livro.codigo}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{livro.titulo}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{livro.resumo}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
                <ul>
                    {livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{nomeEditora}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
                <button onClick={() => excluir(livro.codigo)}>Excluir</button>
            </td>
        </tr>
        
    );
};

const LivroLista = () => {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        setLivros(controleLivro.obterLivros());
        setCarregado(true);
    }, [carregado]);
 
    const excluir = (codigo) => {
        controleLivro.excluir(codigo);
        setCarregado(false); 
    };

    return (
        <main>
            <h1>Catálogo de Livros</h1>
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Título</th>
                        <th>Resumo</th>
                        <th>Autores</th>
                        <th>Editora</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro) => (
                        <LinhaLivro 
                            key={livro.codigo} 
                            livro={livro} 
                            excluir={excluir} 
                        />
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default LivroLista;

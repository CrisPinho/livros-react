import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import controleLivro from './controle/ControleLivros'; 
import controleEditora from './controle/ControleEditora'; 

function LivroDados() {
  const opcoes = controleEditora.getEditoras().map((editora) => ({
    value: editora.codEditora,
    text: editora.nome,
  }));

  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(opcoes[0].value);

  const navigate = useNavigate();

  const tratarCombo = (evento) => {
    setCodEditora(Number(evento.target.value));
  };

  const incluir = (evento) => {
    evento.preventDefault();

    const novoLivro = {
      codigo: 0,
      titulo: titulo,
      resumo: resumo,
      codEditora: codEditora,
      autores: autores.split('\n'),
    };

    controleLivro.incluir(novoLivro);
    navigate('/');
  };

  return (
    <main>
      <h2>Incluir Novo Livro</h2>
      <form onSubmit={incluir}>
        <div className="mb-3">
          <label className="form-label">Título:</label>
          <input
            type="text"
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Resumo:</label>
          <textarea
            className="form-control"
            rows="3"
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Autores (separados por linha):</label>
          <textarea
            className="form-control"
            rows="3"
            value={autores}
            onChange={(e) => setAutores(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Editora:</label>
          <select
            className="form-select"
            value={codEditora}
            onChange={tratarCombo}
            required
          >
            {opcoes.map((opcao) => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.text}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Incluir Livro</button>
      </form>
    </main>
  );
}

export default LivroDados;



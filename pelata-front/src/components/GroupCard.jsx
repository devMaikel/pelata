import React from 'react'

export default function GroupCard({ descricao, nome, jogadores_cadastrados, peladas }) {
  return (
    <div>
      <h3>{ nome }</h3>
      <p>{ descricao }</p>
      <p>Qtd jogadores: { jogadores_cadastrados.length }</p>
      <p>Qtd peladas: { peladas.length }</p>
      <button>Participar do Grupo</button>
    </div>
  )
}

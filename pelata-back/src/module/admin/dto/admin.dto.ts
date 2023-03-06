export class CriarGrupo {
  nome: string;
  descricao: string;
  token: string;
}

export class CriarPelada {
  grupo_id: number;
  data: string;
  cep: string;
  token: string;
}

export class CriarPartida {
  pelada_id: number;
  vencedor_id: number;
  token: string;
}

export class CriarTime {
  pelada_id: number;
  cor: string;
  token: string;
}

export class CriarGrupo {
  admin_id: number;
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
  token: string;
}

export class CriarTime {
  cor: string;
  token: string;
}

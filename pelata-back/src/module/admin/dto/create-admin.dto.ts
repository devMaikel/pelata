export class CriarGrupo {
  admin_id: number;
  nome: string;
  descricao: string;
  token: string;
}

export class CriarPelada {
  grupoId: number;
  data: string;
  cep: string;
  token: string;
}

export class CriarPartida {
  peladaId: number;
  token: string;
}

export class CriarTime {
  cor: string;
  token: string;
}

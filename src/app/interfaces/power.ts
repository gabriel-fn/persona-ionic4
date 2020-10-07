export interface Power {
    poder_id: number,
    nome: string,
    efeito?: string,
    acao?: string,
    alcance?: string,
    duracao?: string,
    salvamento?: string,
    custo_min?: number,
    custo_max?: number,
    custo: number,
    custos: number[],
    checked: boolean,
    graduacao: number,
    extras: PowerOption[],
    falhas: PowerOption[],
    opcoes: PowerOption[],
    poderes_alternativos: PowerOption[],
}

export interface PowerOption {
    id: number,
    nome: string,
    modificador: number,
    modificador_min?: number,
    modificador_max?: number,
    modificadores: number[],
    checked: boolean
}
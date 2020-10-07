export interface Item{
    id: number,
    nome: string,
    graduacao: number,
    checked: boolean,
    graduacao_max?: number,
    graduacao_min?: number,
    habilidade_chave?: string,
}
import { TotalPoints } from './total-points';
import { Item, Key, Power} from './';

export class Persona implements Persona{
    nome: string ='noob';
    np: number = 1;

    forca: number = 10;
    destreza: number = 10;
    constituicao: number = 10;
    inteligencia: number = 10;
    sabedoria: number = 10;
    carisma: number = 10;
    
    dano: number = 0;
    ataque: number = 0;
    defesa: number = 0;
    vida: number = 0;
    iniciativa: number = 0;

    resistencia: number = 0;
    reflexo: number = 0;
    fortitude: number = 0;
    vontade: number = 0;

    feitos: Item[] = [];
    pericias: Item[] = [];
    desvantagens: Item[] = [];
    poderes: Power[] = [];

    constructor(persona: Persona = null) {
        if(persona){
            this.id = persona.id||null;
            this.nome = persona.nome||'noob';
            this.np = persona.np||1;
        
            this.forca = persona.forca||10;
            this.destreza = persona.destreza||10;
            this.constituicao = persona.constituicao||10;
            this.inteligencia = persona.inteligencia||10;
            this.sabedoria = persona.sabedoria||10;
            this.carisma = persona.carisma||10;
            
            this.dano = persona.dano||0;
            this.ataque = persona.ataque||0;
            this.defesa = persona.defesa||0;
            this.vida = persona.vida||0;
            this.iniciativa = persona.iniciativa||0;
        
            this.resistencia = persona.resistencia||0;
            this.reflexo = persona.reflexo||0;
            this.fortitude = persona.fortitude||0;
            this.vontade = persona.vontade||0;
        
            this.feitos = persona.feitos||[];
            this.pericias = persona.pericias||[];
            this.desvantagens = persona.desvantagens||[];
            this.poderes = persona.poderes||[];
        }
    }

    get bonusPoints() {
        return {    
            forca : Math.floor((this.forca-10)/2),
            destreza : Math.floor((this.destreza-10)/2),
            constituicao : Math.floor((this.constituicao-10)/2),
            inteligencia : Math.floor((this.inteligencia-10)/2),
            sabedoria : Math.floor((this.sabedoria-10)/2),
            carisma : Math.floor((this.carisma-10)/2),
        
            dano : (this.dano+(this.forca-10))/2,
            ataque : this.ataque/2,
            defesa : 10 + (this.defesa/2),
            vida : this.constituicao + (this.constituicao-10)/2 + this.vida + this.np,
            iniciativa : this.iniciativa + (this.destreza-10)/2,
        
            resistencia : this.resistencia + (this.constituicao-10)/2,
            reflexo : this.reflexo + (this.destreza-10)/2,
            fortitude : this.fortitude + (this.constituicao-10)/2,
            vontade : this.vontade + (this.sabedoria-10)/2,
        }
    }

    get totalPoints(): TotalPoints {    
        let totalPoints: TotalPoints = {
            habilidade : this.sumKeys(this.abilityKeys) - 60,
            combate : this.sumKeys(this.combatKeys),
            salvamento : this.sumKeys( this.savingKeys),
            feito : this.feitos.reduce((total, feito) => total + feito.graduacao, 0),
            pericia : Math.ceil((this.pericias.reduce((total, pericia) => total + pericia.graduacao, 0))/4),
            desvantagem : this.desvantagens.reduce((total, desvantagem) => total + desvantagem.graduacao, 0),
            poder: this.poderes.reduce((total, poder) => {
                let custoTotal: number;
                custoTotal = poder.custo;

                custoTotal += poder.extras.reduce((total, extra) => {
                    return total + extra.modificador;
                }, 0);

                custoTotal -= poder.falhas.reduce((total, falha) => {
                    return total + falha.modificador;
                }, 0);

                if (custoTotal <= 0) {
                    custoTotal = Math.ceil(poder.graduacao/(2 - custoTotal));
                } else {
                    custoTotal = poder.graduacao * custoTotal;
                }

                custoTotal += poder.opcoes.reduce((total, opcao) => {
                    return total + opcao.modificador;
                }, 0);

                custoTotal += poder.poderes_alternativos.reduce((total, poderAlternativo) => {
                    return total + poderAlternativo.modificador;
                }, 0);

                return total + custoTotal;
            }, 0),
            all : 0,
        }

        totalPoints.all = totalPoints.habilidade + totalPoints.combate + totalPoints.salvamento + totalPoints.pericia + totalPoints.feito - totalPoints.desvantagem + totalPoints.poder;
        return totalPoints;
    }

    sumKeys( keys: Key[]): number {
        let total: number = 0;
        for(let key of keys) {
          total += this[key.name];
        }
        return total;
    }

    abilityKeys: Key[] = [
        { label : "Força", name : "forca" },
        { label : "Destreza", name : "destreza" }, 
        { label : "Constituição", name : "constituicao" }, 
        { label : "Inteligência", name : "inteligencia" }, 
        { label : "Sabedoria", name : "sabedoria" }, 
        { label : "Carisma", name : "carisma" }
    ];
    
    
    combatKeys: Key[] = [
        { label : "Dano", name : "dano" },
        { label : "Ataque", name : "ataque" },
        { label : "Defesa", name : "defesa" },
        { label : "Vida", name : "vida" },
        { label : "Iniciativa", name : "iniciativa" },
    ];
    
    
    savingKeys: Key[] = [
        { label : "Resistência", name : "resistencia"},
        { label : "Reflexo", name : "reflexo"},
        { label : "Fortitude", name : "fortitude"},
        { label : "Vontade", name : "vontade"},
    ];
}

export interface Persona {
    id?: number,
    nome: string,
    np: number,

    forca: number,
    destreza: number,
    constituicao: number,
    inteligencia: number,
    sabedoria: number,
    carisma: number,

    dano: number,
    ataque: number,
    defesa: number,
    vida: number,
    iniciativa: number,

    resistencia: number,
    reflexo: number,
    fortitude: number,
    vontade: number,

    pericias: Item[],
    feitos: Item[],
    desvantagens: Item[],
    poderes: Power[],
}
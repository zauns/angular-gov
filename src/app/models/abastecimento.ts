export interface Abastecimento {
  id: number;
  data: string;
  posto: string;
  cidade: string;
  uf: Uf;
  tipo: Combustivel;
  valorLitro: number;
  litros: number;
  totalPago: number;
  motorista: string;
  cpfMotorista: string;
  veiculo: string;
}

export type Combustivel = 'Gasolina' | 'Etanol' | 'Diesel';
export type Uf =
  | 'AC' | 'AL' | 'AP' | 'AM' | 'BA' | 'CE' | 'DF' | 'ES'
  | 'GO' | 'MA' | 'MT' | 'MS' | 'MG' | 'PA' | 'PB' | 'PR'
  | 'PE' | 'PI' | 'RJ' | 'RN' | 'RS' | 'RO' | 'RR' | 'SC'
  | 'SP' | 'SE' | 'TO';

export interface Kpi {
  titulo: string;
  valor: string;
  icone?: string;
  cor?: string;
}

export interface ConsumoPorUf {
  uf: Uf;
  litros: number;
}

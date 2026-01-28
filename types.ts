
export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export enum GuidanceTopic {
  FINANCE = 'Finanças',
  HEALTH = 'Saúde',
  PURPOSE = 'Propósito',
  GRIEF = 'Luto',
  RELATIONSHIPS = 'Relacionamentos',
  PEACE = 'Encontrar Paz'
}

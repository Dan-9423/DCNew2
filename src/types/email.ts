export type EmailStatus = 'draft' | 'saved' | 'sent';

export interface EmailData {
  razaoSocial: string;
  nomeFantasia?: string;
  cnpj?: string;
  email: string;
  numeroNF: string;
  valorTotal: number;
  dataVencimento?: string;
  observacoes?: string;
}

export interface EmailHistory {
  id: string;
  emailData: EmailData;
  sentAt: string;
  status: EmailStatus;
  logs?: EmailLog[];
}

export interface EmailLog {
  id: string;
  timestamp: Date;
  action: string;
  details: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
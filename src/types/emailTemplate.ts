export interface EmailTemplateVersion {
  id: string;
  version: string;
  subject: string;
  content: string;
  createdAt: string;
}

export interface EmailTemplateState {
  templates: EmailTemplateVersion[];
}
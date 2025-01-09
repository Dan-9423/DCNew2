import { useState } from 'react';
import { Paperclip } from 'lucide-react';
import { useCustomers } from '@/contexts/CustomerContext';
import { useEmailTemplate } from '@/contexts/EmailTemplateContext';
import { EmailData } from '@/types/email';
import EmailForm from '@/components/forms/EmailForm';
import EmailPreview from '@/components/emails/EmailPreview';
import { getEmailTemplate } from '@/lib/email';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function EnviarEmail() {
  const { toast } = useToast();
  const { customers } = useCustomers();
  const { templates } = useEmailTemplate();
  const [emailData, setEmailData] = useState<EmailData | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);

  const handleEmailSubmit = (data: EmailData) => {
    setEmailData(data);
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(file => file.type === 'application/pdf');
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!emailData) return;

    try {
      // Here you would implement the actual save logic
      toast({
        title: "E-mail salvo",
        description: "O e-mail foi salvo com sucesso no histórico.",
      });
      setEmailData(null);
      setAttachments([]);
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar o e-mail.",
        variant: "destructive",
      });
    }
  };

  const handleSaveAndSend = async () => {
    if (!emailData) return;

    setIsSending(true);
    try {
      // Here you would implement the actual save and send logic
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating API call
      
      toast({
        title: "E-mail enviado",
        description: "O e-mail foi salvo e enviado com sucesso.",
      });
      setEmailData(null);
      setAttachments([]);
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar o e-mail.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Coluna da Esquerda - Formulário */}
      <div className="bg-white dark:bg-[#1C1C1C] rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-6">Inserção de Dados</h2>
        
        <EmailForm 
          onSubmit={handleEmailSubmit}
          customers={customers}
        />

        {/* Anexos - Movido para depois do formulário */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Anexos</h3>
            <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
              <Paperclip className="h-4 w-4 mr-2" />
              Adicionar Anexo
            </Button>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".pdf"
              multiple
              onChange={handleAttachmentChange}
            />
          </div>

          {attachments.length > 0 && (
            <div className="space-y-2">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center">
                    <Paperclip className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => removeAttachment(index)}
                  >
                    Remover
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Coluna da Direita - Preview */}
      <div className="bg-white dark:bg-[#1C1C1C] rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Visualização do E-mail</h2>
          {emailData && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSave}>
                Salvar
              </Button>
              <Button onClick={handleSaveAndSend} disabled={isSending}>
                {isSending ? "Enviando..." : "Salvar e Enviar"}
              </Button>
            </div>
          )}
        </div>
        
        {emailData ? (
          <EmailPreview
            data={emailData}
            template={getEmailTemplate(emailData, templates[0]?.content || '')}
            attachments={attachments}
          />
        ) : (
          <div className="flex items-center justify-center h-[600px] text-muted-foreground">
            Preencha os dados do e-mail para visualizar
          </div>
        )}
      </div>
    </div>
  );
}
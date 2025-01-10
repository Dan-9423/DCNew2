import { useState } from 'react';
import { Logo } from '@/components/Logo';
import { Globe, Mail, Phone, Instagram } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface AccountEntry {
  dueDate: string;
  provider: string;
  invoice: string;
  value: number;
}

export default function ContasSemanais() {
  const [companyData, setCompanyData] = useState({
    name: 'MEGAFIX',
    partner: '',
    cnpj: '',
  });

  const [accountsPayable, setAccountsPayable] = useState<AccountEntry[]>([
    { dueDate: '', provider: '', invoice: '', value: 0 },
    { dueDate: '', provider: '', invoice: '', value: 0 },
    { dueDate: '', provider: '', invoice: '', value: 0 },
    { dueDate: '', provider: '', invoice: '', value: 0 },
    { dueDate: '', provider: '', invoice: '', value: 0 },
  ]);

  const [accountsReceivable, setAccountsReceivable] = useState<AccountEntry[]>([
    { dueDate: '', provider: '', invoice: '', value: 0 },
    { dueDate: '', provider: '', invoice: '', value: 0 },
    { dueDate: '', provider: '', invoice: '', value: 0 },
    { dueDate: '', provider: '', invoice: '', value: 0 },
    { dueDate: '', provider: '', invoice: '', value: 0 },
  ]);

  const totalPayable = accountsPayable.reduce((sum, entry) => sum + entry.value, 0);
  const totalReceivable = accountsReceivable.reduce((sum, entry) => sum + entry.value, 0);
  const balance = totalReceivable - totalPayable;

  return (
    <div className="w-[1920px] h-[1080px] bg-[#F5F5F5] mx-auto scale-[0.6] origin-top">
      {/* Header */}
      <div className="bg-[#0030B9] h-[180px] rounded-t-[20px] flex items-center px-16">
        <div className="flex justify-between items-center w-full">
          <div className="w-[200px]">
            <Logo />
          </div>
          <h1 className="text-white text-5xl font-bold">RESUMO DE CONTAS</h1>
          <div className="w-[200px]" />
        </div>
      </div>

      {/* Content */}
      <div className="px-16 py-12 space-y-12">
        {/* Info Cards */}
        <div className="grid grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="bg-white rounded-[20px] p-8 shadow-lg">
            <div className="flex gap-6">
              <img 
                src="/megafix-logo.png" 
                alt="Megafix" 
                className="w-24 h-24 object-contain"
              />
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">EMPRESA:</div>
                  <div className="font-medium">{companyData.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">SÓCIO:</div>
                  <div className="font-medium">{companyData.partner}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">CNPJ:</div>
                  <div className="font-medium">{companyData.cnpj}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="bg-white rounded-[20px] p-8 shadow-lg">
            <div className="border-l-4 border-[#F47400] pl-4">
              <div className="text-lg font-medium">Pagamentos totais</div>
              <div className="text-3xl font-bold text-red-600 mt-2">
                {formatCurrency(totalPayable)}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-8 shadow-lg">
            <div className="border-l-4 border-[#F47400] pl-4">
              <div className="text-lg font-medium">Recebimentos totais</div>
              <div className="text-3xl font-bold text-green-600 mt-2">
                {formatCurrency(totalReceivable)}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-8 shadow-lg">
            <div className="border-l-4 border-[#F47400] pl-4">
              <div className="text-lg font-medium">Saldo total</div>
              <div className={`text-3xl font-bold mt-2 ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(balance)}
              </div>
            </div>
          </div>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-2 gap-8">
          {/* Accounts Payable */}
          <div className="bg-white rounded-[20px] shadow-lg overflow-hidden">
            <div className="bg-[#0030B9] text-white text-xl font-medium p-4">
              CONTAS A PAGAR (TOP 5)
            </div>
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="bg-[#0030B9] text-white p-3 rounded-l">VENCIMENTO</th>
                    <th className="bg-[#0030B9] text-white p-3">FORNECEDOR</th>
                    <th className="bg-[#0030B9] text-white p-3">NOTA FISCAL</th>
                    <th className="bg-[#0030B9] text-white p-3 rounded-r">VALOR</th>
                  </tr>
                </thead>
                <tbody>
                  {accountsPayable.map((entry, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="p-3">
                        <input
                          type="date"
                          value={entry.dueDate}
                          onChange={(e) => {
                            const newEntries = [...accountsPayable];
                            newEntries[index].dueDate = e.target.value;
                            setAccountsPayable(newEntries);
                          }}
                          className="w-full border border-gray-200 rounded p-2"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={entry.provider}
                          onChange={(e) => {
                            const newEntries = [...accountsPayable];
                            newEntries[index].provider = e.target.value;
                            setAccountsPayable(newEntries);
                          }}
                          className="w-full border border-gray-200 rounded p-2"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={entry.invoice}
                          onChange={(e) => {
                            const newEntries = [...accountsPayable];
                            newEntries[index].invoice = e.target.value;
                            setAccountsPayable(newEntries);
                          }}
                          className="w-full border border-gray-200 rounded p-2"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={entry.value}
                          onChange={(e) => {
                            const newEntries = [...accountsPayable];
                            newEntries[index].value = Number(e.target.value);
                            setAccountsPayable(newEntries);
                          }}
                          className="w-full border border-gray-200 rounded p-2"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="p-3 text-right font-bold bg-[#0030B9] text-white">
                      TOTAL
                    </td>
                    <td className="p-3 font-bold bg-[#0030B9] text-white">
                      {formatCurrency(totalPayable)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Accounts Receivable */}
          <div className="bg-white rounded-[20px] shadow-lg overflow-hidden">
            <div className="bg-[#0030B9] text-white text-xl font-medium p-4">
              CONTAS A RECEBER (TOP 5)
            </div>
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="bg-[#0030B9] text-white p-3 rounded-l">VENCIMENTO</th>
                    <th className="bg-[#0030B9] text-white p-3">FORNECEDOR</th>
                    <th className="bg-[#0030B9] text-white p-3">NOTA FISCAL</th>
                    <th className="bg-[#0030B9] text-white p-3 rounded-r">VALOR</th>
                  </tr>
                </thead>
                <tbody>
                  {accountsReceivable.map((entry, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="p-3">
                        <input
                          type="date"
                          value={entry.dueDate}
                          onChange={(e) => {
                            const newEntries = [...accountsReceivable];
                            newEntries[index].dueDate = e.target.value;
                            setAccountsReceivable(newEntries);
                          }}
                          className="w-full border border-gray-200 rounded p-2"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={entry.provider}
                          onChange={(e) => {
                            const newEntries = [...accountsReceivable];
                            newEntries[index].provider = e.target.value;
                            setAccountsReceivable(newEntries);
                          }}
                          className="w-full border border-gray-200 rounded p-2"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={entry.invoice}
                          onChange={(e) => {
                            const newEntries = [...accountsReceivable];
                            newEntries[index].invoice = e.target.value;
                            setAccountsReceivable(newEntries);
                          }}
                          className="w-full border border-gray-200 rounded p-2"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={entry.value}
                          onChange={(e) => {
                            const newEntries = [...accountsReceivable];
                            newEntries[index].value = Number(e.target.value);
                            setAccountsReceivable(newEntries);
                          }}
                          className="w-full border border-gray-200 rounded p-2"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="p-3 text-right font-bold bg-[#0030B9] text-white">
                      TOTAL
                    </td>
                    <td className="p-3 font-bold bg-[#0030B9] text-white">
                      {formatCurrency(totalReceivable)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#F47400] h-[80px] absolute bottom-0 w-full flex items-center justify-center">
        <div className="flex items-center gap-16 text-white">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6" />
            <span>www.dcadvisors.com.br</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6" />
            <span>contato@dcadvisors.com.br</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-6 w-6" />
            <span>(11) 99456-1052</span>
          </div>
          <div className="flex items-center gap-2">
            <Instagram className="h-6 w-6" />
            <span>@d.c.advisors</span>
          </div>
        </div>
      </div>
    </div>
  );
}
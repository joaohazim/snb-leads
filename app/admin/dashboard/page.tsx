"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Building2, Mail, Phone, MessageSquare, Calendar, LogOut, Users, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string | null;
  createdAt: string;
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch("/api/admin/leads");
      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }
      
      const data = await response.json();
      if (data.success) {
        setLeads(data.leads);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Erro ao carregar leads");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    document.cookie = "admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/admin/login");
  };

  const getInterestBadge = (interest: string) => {
    const variants = {
      "porto-algarve": "bg-blue-100 text-blue-800",
      "porto-riviera": "bg-purple-100 text-purple-800",
      "ambos": "bg-green-100 text-green-800"
    };
    
    const labels = {
      "porto-algarve": "Porto Algarve",
      "porto-riviera": "Porto Riviera",
      "ambos": "Ambos"
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${variants[interest as keyof typeof variants] || 'bg-gray-100 text-gray-800'}`}>
        {labels[interest as keyof typeof labels] || interest}
      </span>
    );
  };

  const exportToCSV = () => {
    const headers = ['Nome', 'Email', 'Telefone', 'Interesse', 'Mensagem', 'Data'];
    const csvData = leads.map(lead => [
      lead.name,
      lead.email,
      lead.phone,
      lead.interest,
      lead.message || '',
      new Date(lead.createdAt).toLocaleString('pt-BR')
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Admin SNB Leads</h1>
                <p className="text-sm text-slate-600">Painel de Administração</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={exportToCSV} variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Exportar CSV
              </Button>
              <Button onClick={handleLogout} variant="outline" size="sm" className="gap-2">
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total de Leads</p>
                <p className="text-2xl font-bold text-slate-900">{leads.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Hoje</p>
                <p className="text-2xl font-bold text-slate-900">
                  {leads.filter(lead => 
                    new Date(lead.createdAt).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Com Mensagem</p>
                <p className="text-2xl font-bold text-slate-900">
                  {leads.filter(lead => lead.message).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-slate-900">Leads Capturados</h2>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border-b border-red-200">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {leads.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">Nenhum lead capturado ainda</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contato
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Interesse
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mensagem
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="font-medium text-slate-900">{lead.name}</p>
                          <div className="flex items-center gap-1 text-sm text-slate-600">
                            <Mail className="w-3 h-3" />
                            {lead.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-slate-600">
                            <Phone className="w-3 h-3" />
                            {lead.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getInterestBadge(lead.interest)}
                      </td>
                      <td className="px-6 py-4">
                        {lead.message ? (
                          <p className="text-sm text-slate-600 max-w-xs truncate" title={lead.message}>
                            {lead.message}
                          </p>
                        ) : (
                          <span className="text-slate-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(lead.createdAt).toLocaleString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
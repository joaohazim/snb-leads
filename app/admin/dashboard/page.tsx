"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function SimpleDashboard() {
  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      window.location.replace('/admin/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    window.location.replace('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard Admin</h1>
            <Button onClick={handleLogout} variant="outline" size="sm" className="gap-2">
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
          
          <p className="text-gray-600">
            Login funcionou! Esta é uma versão temporária do dashboard.
          </p>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              Os leads capturados aparecerão aqui quando a integração com o banco de dados for restaurada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
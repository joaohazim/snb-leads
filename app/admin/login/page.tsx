"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Lock } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!username || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      // Simple hardcoded check for now
      if (username === "admin" && password === "admin123") {
        // Generate a simple token
        const simpleToken = btoa(`${username}:${Date.now()}`);
        
        // Save token
        localStorage.setItem('admin-token', simpleToken);
        
        // Force page reload to dashboard
        window.location.replace("/admin/dashboard");
      } else {
        setError("Credenciais inválidas");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Admin SNB Leads</h1>
          <p className="text-slate-600 mt-2">Acesso ao painel administrativo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Usuário</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}


          <Button type="submit" disabled={isLoading} className="w-full gap-2">
            {isLoading ? (
              "Entrando..."
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Entrar
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-slate-50 rounded-lg text-sm text-slate-600">
          <p className="font-medium mb-1">Credenciais padrão:</p>
          <p>Usuário: <code className="bg-slate-200 px-1 rounded">admin</code></p>
          <p>Senha: <code className="bg-slate-200 px-1 rounded">admin123</code></p>
        </div>
      </div>
    </div>
  );
}
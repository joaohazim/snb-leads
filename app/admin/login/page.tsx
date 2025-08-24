"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Lock } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setDebugInfo("Iniciando login...");

    try {
      console.log("🔐 Starting login process", { username });
      setDebugInfo("Chamando API de login...");

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      console.log("📡 API Response", { 
        ok: response.ok, 
        status: response.status,
        headers: Object.fromEntries(response.headers.entries())
      });

      const responseData = await response.json();
      console.log("📄 Response Data", responseData);

      if (response.ok) {
        setDebugInfo("Login bem-sucedido, salvando token...");
        console.log("✅ Login successful, token:", responseData.token?.substring(0, 20) + "...");

        try {
          localStorage.setItem('admin-token', responseData.token);
          console.log("💾 Token saved to localStorage");
          
          // Verify token was saved
          const savedToken = localStorage.getItem('admin-token');
          if (!savedToken) {
            throw new Error('Token não foi salvo corretamente');
          }
          console.log("✅ Token verified in localStorage");
          
          setDebugInfo("Token salvo e verificado, redirecionando...");
          setIsRedirecting(true);
          
          // Use router.push with refresh
          console.log("🚀 Starting redirect to dashboard");
          console.log("📍 Current pathname:", window.location.pathname);
          
          // Simple redirect without async/await
          console.log("🔄 Using window.location for redirect");
          window.location.href = "/admin/dashboard";
          
          setDebugInfo("Redirecionamento iniciado...");
          
        } catch (storageError) {
          console.error("❌ localStorage error:", storageError);
          setError("Erro ao salvar token no navegador");
          setDebugInfo("Erro: " + (storageError as Error).message);
        }
      } else {
        console.log("❌ Login failed:", responseData);
        setError(responseData.message || "Credenciais inválidas");
        setDebugInfo(`Erro: ${response.status} - ${responseData.message}`);
      }
    } catch (fetchError) {
      console.error("❌ Network error:", fetchError);
      setError("Erro de conexão com o servidor");
      setDebugInfo("Erro: Falha na conexão");
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

          {debugInfo && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-md text-sm">
              <strong>Debug:</strong> {debugInfo}
            </div>
          )}

          {isRedirecting && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-md text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                Redirecionando para o dashboard...
              </div>
            </div>
          )}

          <Button type="submit" disabled={isLoading || isRedirecting} className="w-full gap-2">
            {isRedirecting ? (
              "Redirecionando..."
            ) : isLoading ? (
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
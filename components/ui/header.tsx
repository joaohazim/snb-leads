import { Building2 } from "lucide-react";

export function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-blue-600" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900">Open Doors</span>
              <span className="text-xs text-slate-600">Investimentos Imobiliários</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 hidden sm:block">Parceria exclusiva com</span>
            <span className="text-sm font-semibold text-slate-900">SNB Engenharia</span>
          </div>
        </div>
      </div>
    </header>
  );
}
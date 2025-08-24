import { Bitcoin, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SectionDividerProps {
  onContactClick: () => void;
}

export function SectionDivider({ onContactClick }: SectionDividerProps) {
  return (
    <div className="w-full py-16 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Momento oportuno para investir em imóveis
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Se você tem vontade de diversificar seus investimentos - se acredita que agora é um bom momento, você pode fazer isso utilizando criptomoedas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <Bitcoin className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-semibold text-white">Aceita Bitcoin e stablecoins</h3>
              <p className="text-sm text-blue-200">Pagamento fácil e seguro</p>
            </div>

            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white">Alta rentabilidade</h3>
              <p className="text-sm text-blue-200">Retornos de 15% à 30% ao ano</p>
            </div>

            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white">Parceria Confiável</h3>
              <p className="text-sm text-blue-200">Open Doors + SNB Engenharia</p>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              onClick={onContactClick}
            >
              Garanta sua Oportunidade Agora
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
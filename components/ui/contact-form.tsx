"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Bitcoin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  interest: z.string().min(1, "Selecione um empreendimento"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // Simular envio do formulário
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form data:", data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="w-full py-12 lg:py-20 bg-white border-t border-gray-200" id="contato">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center space-y-4 p-8 bg-white rounded-xl shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Obrigado pelo seu interesse!</h3>
            <p className="text-lg text-slate-600">
              Recebemos suas informações e entraremos em contato em breve para apresentar mais detalhes sobre os empreendimentos.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-12 lg:py-20 bg-white border-t border-gray-200" id="contato">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <Badge className="bg-green-600 mb-4">
            <Bitcoin className="w-4 h-4 mr-1" />
            Aceita Pagamento em Bitcoin
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Diversifique seus investimentos pagando em Bitcoin ou stablecoin
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Preencha o formulário abaixo e nossa equipe entrará em contato para apresentar mais detalhes sobre os empreendimentos.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Seu nome"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="seu@email.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone *</Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="(00) 00000-0000"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="interest">Empreendimento de Interesse *</Label>
              <Select onValueChange={(value) => setValue("interest", value)}>
                <SelectTrigger className={errors.interest ? "border-red-500" : ""}>
                  <SelectValue placeholder="Selecione um empreendimento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="porto-algarve">Porto Algarve - Studios Premium</SelectItem>
                  <SelectItem value="porto-riviera">Porto Riviera - Rooftop com Piscina</SelectItem>
                  <SelectItem value="ambos">Ambos os empreendimentos</SelectItem>
                </SelectContent>
              </Select>
              {errors.interest && (
                <p className="text-sm text-red-500">{errors.interest.message}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="message">Mensagem (Opcional)</Label>
              <Textarea
                id="message"
                {...register("message")}
                placeholder="Conte-nos mais sobre seu interesse ou dúvidas..."
                rows={4}
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <p className="text-sm text-slate-600">
              * Campos obrigatórios
            </p>
            <Button type="submit" size="lg" disabled={isSubmitting} className="gap-2">
              {isSubmitting ? (
                <>Enviando...</>
              ) : (
                <>
                  Quero Investir <Send className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900 text-center">
              🔒 Suas informações estão seguras. Parceria exclusiva Open Doors + SNB Engenharia.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
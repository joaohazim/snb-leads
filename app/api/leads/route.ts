import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { leads } from '@/lib/db/schema';
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  interest: z.string().min(1),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = leadSchema.parse(body);

    const result = await db.insert(leads).values({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      interest: validatedData.interest,
      message: validatedData.message || null,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Lead salvo com sucesso!' 
    });
  } catch (error) {
    console.error('Erro ao salvar lead:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, generateToken } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    console.log("🔐 LOGIN API: Starting authentication");
    console.log("🌍 LOGIN API: Environment check", {
      nodeEnv: process.env.NODE_ENV,
      hasJwtSecret: !!process.env.JWT_SECRET,
      hasPasswordHash: !!process.env.ADMIN_PASSWORD_HASH,
      jwtSecretLength: process.env.JWT_SECRET?.length,
      passwordHashLength: process.env.ADMIN_PASSWORD_HASH?.length
    });
    
    const { username, password } = await request.json();
    console.log("📝 LOGIN API: Received credentials", { username, passwordLength: password?.length });

    // Verificar usuário e senha
    if (username !== 'admin') {
      console.log("❌ LOGIN API: Invalid username", { username });
      return NextResponse.json(
        { success: false, message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    console.log("🔍 LOGIN API: Verifying password...");
    const isValidPassword = await verifyPassword(password);
    console.log("🔍 LOGIN API: Password verification result", { isValidPassword });
    
    if (!isValidPassword) {
      console.log("❌ LOGIN API: Invalid password");
      return NextResponse.json(
        { success: false, message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Gerar token JWT
    console.log("🎫 LOGIN API: Generating JWT token...");
    const token = generateToken();
    console.log("✅ LOGIN API: Token generated successfully", { tokenLength: token?.length });

    console.log("🚀 LOGIN API: Sending success response");
    return NextResponse.json({ 
      success: true, 
      token,
      message: 'Login realizado com sucesso' 
    });
  } catch (error) {
    console.error('❌ LOGIN API: Erro no login:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
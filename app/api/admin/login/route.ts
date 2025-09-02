import { NextRequest, NextResponse } from "next/server";

// Credenciais hardcoded - ultra simples
const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log("Login attempt:", { username, hasPassword: !!password });

    // Verificação simples
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // Login successful - create response with cookie
      const response = NextResponse.json({
        success: true,
        message: "Login realizado com sucesso"
      });

      // Set simple cookie for authentication
      response.cookies.set('admin_logged', 'yes', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/'
      });

      console.log("Login successful");
      return response;
    }

    console.log("Login failed - invalid credentials");
    return NextResponse.json({
      success: false,
      message: "Usuário ou senha incorretos"
    }, { status: 401 });

  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({
      success: false,
      message: "Erro interno do servidor"
    }, { status: 500 });
  }
}
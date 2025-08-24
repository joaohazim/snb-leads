import { NextResponse } from 'next/server';
import { verifyPassword, generateToken, verifyToken } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET() {
  try {
    console.log("🔍 DEBUG API: Environment variables check");
    
    // Test password verification with known password
    const testPassword = 'admin123';
    const isValidPassword = await verifyPassword(testPassword);
    console.log("🔍 DEBUG API: Password test result", { isValidPassword });

    // Test token generation
    const testToken = generateToken();
    console.log("🔍 DEBUG API: Token generation test", { tokenGenerated: !!testToken });

    // Test token verification
    const isValidToken = verifyToken(testToken);
    console.log("🔍 DEBUG API: Token verification test", { isValidToken });

    return NextResponse.json({ 
      success: true,
      environment: process.env.NODE_ENV,
      hasJwtSecret: !!process.env.JWT_SECRET,
      hasPasswordHash: !!process.env.ADMIN_PASSWORD_HASH,
      passwordTest: isValidPassword,
      tokenGenerated: !!testToken,
      tokenValid: isValidToken,
      jwtSecretLength: process.env.JWT_SECRET?.length,
      passwordHashLength: process.env.ADMIN_PASSWORD_HASH?.length
    });
  } catch (error) {
    console.error('❌ DEBUG API: Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2b$10$Q2uKwIvKNdp/e5YOW27c6OUhBMMch086Ti88cRIjghvFZjq71/RpO'; // Hash for 'admin123'

export async function verifyPassword(password: string): Promise<boolean> {
  console.log("🔐 AUTH: Verifying password...", { 
    passwordLength: password?.length,
    hashLength: ADMIN_PASSWORD_HASH?.length,
    hasHash: !!ADMIN_PASSWORD_HASH 
  });
  
  try {
    const result = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    console.log("🔐 AUTH: Password comparison result", { result });
    return result;
  } catch (error) {
    console.error("❌ AUTH: Password verification error", error);
    return false;
  }
}

export function generateToken(): string {
  console.log("🎫 AUTH: Generating token...", { 
    hasSecret: !!JWT_SECRET,
    secretLength: JWT_SECRET?.length 
  });
  
  try {
    const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '24h' });
    console.log("✅ AUTH: Token generated successfully", { tokenLength: token?.length });
    return token;
  } catch (error) {
    console.error("❌ AUTH: Token generation error", error);
    throw error;
  }
}

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}
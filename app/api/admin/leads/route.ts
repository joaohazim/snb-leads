import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    // Check authentication via simple cookie
    const adminCookie = request.cookies.get('admin_logged');
    
    console.log("Leads API - checking auth:", { 
      hasCookie: !!adminCookie, 
      cookieValue: adminCookie?.value 
    });

    if (!adminCookie || adminCookie.value !== 'yes') {
      console.log("Leads API - authentication failed");
      return NextResponse.json({
        success: false,
        message: "Não autorizado - faça login novamente"
      }, { status: 401 });
    }

    console.log("Leads API - authentication successful, fetching leads...");

    // Fetch all leads from database
    const allLeads = await db
      .select()
      .from(leads)
      .orderBy(desc(leads.createdAt));

    console.log(`Leads API - found ${allLeads.length} leads`);

    return NextResponse.json({
      success: true,
      leads: allLeads,
      total: allLeads.length
    });

  } catch (error) {
    console.error("Leads API error:", error);
    return NextResponse.json({
      success: false,
      message: "Erro ao carregar leads"
    }, { status: 500 });
  }
}
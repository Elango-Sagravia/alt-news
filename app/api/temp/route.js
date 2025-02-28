export const runtime = "nodejs"; // ✅ Fix for Next.js build error
export const dynamic = "force-dynamic";

import { query } from "@/lib/db";

export async function GET(request) {
  try {
    // Extract query parameters for dynamic date filtering
    const { searchParams } = new URL(request.url);
    const websiteId = 3; // Fixed website ID (can be modified for dynamic input)
    const startDate = searchParams.get("start_date") || "2025-02-20";
    const endDate = searchParams.get("end_date") || "2025-02-27";

    // SQL Query to fetch campaign-wise email open count
    const sql = `
      SELECT 
          c.id AS campaign_id,
          c.name AS campaign_name,
          COUNT(eo.id) AS emails_opened
      FROM emails_open eo
      JOIN campaigns c ON eo.campaign_id = c.id
      WHERE c.website_id = $1
        AND eo.opened_at BETWEEN $2 AND $3::timestamp + INTERVAL '23 hours 59 minutes 59 seconds'
      GROUP BY c.id, c.name;
    `;

    // Execute query
    const results = await query(sql, [websiteId, startDate, endDate]);

    return new Response(
      JSON.stringify({
        total_campaigns: results.rows.length,
        campaigns: results.rows,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching campaign-wise email opens:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

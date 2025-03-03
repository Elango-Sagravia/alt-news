export const runtime = "nodejs"; // ✅ Fix for Next.js build error
export const dynamic = "force-dynamic";

import { query } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // Parse multiple website IDs from query parameters (comma-separated)
  const website_ids = searchParams.get("website_ids")
    ? searchParams.get("website_ids").split(",").map(Number)
    : [1]; // Default to website_id 1 if not provided

  // Set default dates from Jan 1, 2025, to yesterday
  const start_date = "2025-01-01";
  const end_date = "2025-03-3";

  try {
    // Fetch daily cumulative subscribers count
    const dailySubscribersResult = await query(
      `SELECT DATE(subscribers.created_at) AS date, COUNT(*) AS daily_subscribers 
       FROM subscribers 
       WHERE subscribers.website_id = ANY($1) 
       AND DATE(subscribers.created_at) BETWEEN $2 AND $3 
       GROUP BY DATE(subscribers.created_at) 
       ORDER BY DATE(subscribers.created_at);`,
      [website_ids, start_date, end_date]
    );

    // Fetch daily cumulative email opens count
    const dailyEmailOpensResult = await query(
      `SELECT DATE(emails_open.opened_at) AS date, COUNT(*) AS daily_email_opens 
       FROM emails_open 
       JOIN campaigns ON emails_open.campaign_id = campaigns.id
       WHERE campaigns.website_id = ANY($1) 
       AND DATE(emails_open.opened_at) BETWEEN $2 AND $3 
       GROUP BY DATE(emails_open.opened_at) 
       ORDER BY DATE(emails_open.opened_at);`,
      [website_ids, start_date, end_date]
    );

    // Fetch daily cumulative unsubscriptions count
    const dailyUnsubscribersResult = await query(
      `SELECT DATE(emails_unsubscribe.unsubscribed_at) AS date, COUNT(*) AS daily_unsubscribers 
       FROM emails_unsubscribe 
       JOIN campaigns ON emails_unsubscribe.campaign_id = campaigns.id
       WHERE campaigns.website_id = ANY($1) 
       AND DATE(emails_unsubscribe.unsubscribed_at) BETWEEN $2 AND $3 
       GROUP BY DATE(emails_unsubscribe.unsubscribed_at) 
       ORDER BY DATE(emails_unsubscribe.unsubscribed_at);`,
      [website_ids, start_date, end_date]
    );

    // Fetch daily cumulative emails sent count
    const dailyEmailsSentResult = await query(
      `SELECT DATE(emails_sent.created_at) AS date, COUNT(*) AS daily_emails_sent 
       FROM emails_sent 
       JOIN campaigns ON emails_sent.campaign_id = campaigns.id
       WHERE campaigns.website_id = ANY($1) 
       AND DATE(emails_sent.created_at) BETWEEN $2 AND $3 
       GROUP BY DATE(emails_sent.created_at) 
       ORDER BY DATE(emails_sent.created_at);`,
      [website_ids, start_date, end_date]
    );

    // Combine results by date
    const data = {};

    // Helper function to add data into the object
    const addData = (result, key) => {
      result.rows.forEach((row) => {
        const date = row.date.toISOString().split("T")[0]; // Ensure correct format
        if (!data[date])
          data[date] = {
            daily_subscribers: 0,
            daily_email_opens: 0,
            daily_unsubscribers: 0,
            daily_emails_sent: 0,
          };
        data[date][key] = row[key] || 0;
      });
    };

    addData(dailySubscribersResult, "daily_subscribers");
    addData(dailyEmailOpensResult, "daily_email_opens");
    addData(dailyUnsubscribersResult, "daily_unsubscribers");
    addData(dailyEmailsSentResult, "daily_emails_sent");

    // Convert object to array sorted by date
    const result = Object.keys(data)
      .sort()
      .map((date) => ({
        date,
        daily_subscribers: data[date].daily_subscribers || 0,
        daily_email_opens: data[date].daily_email_opens || 0,
        daily_unsubscribers: data[date].daily_unsubscribers || 0,
        daily_emails_sent: data[date].daily_emails_sent || 0,
      }));

    return Response.json(result);
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Error fetching data" }, { status: 500 });
  }
}

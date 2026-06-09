import { NextResponse } from "next/server";
import { model } from "@/lib/gemini";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: vehicles, error } = await supabase
      .from("vehicles")
      .select("*");

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    let reportText = "";

    try {
      const prompt = `
You are a parking analytics assistant.

Analyze this parking data:

${JSON.stringify(vehicles, null, 2)}

Generate a clean markdown report containing:
1. Total vehicles
2. Active vehicles
3. Exited vehicles
4. Peak traffic observations
5. Frequent visitor observations
6. Operational insights

Return a professional report.
`;

      const result = await model.generateContent(prompt);
      reportText = result.response.text();
    } catch (apiError) {
      console.warn("Gemini API call failed, generating local fallback report:", apiError);
      
      const total = vehicles.length;
      const active = vehicles.filter(v => !v.exited).length;
      const exited = vehicles.filter(v => v.exited).length;
      const twoWheelers = vehicles.filter(v => v.vehicle_type === "Two Wheeler").length;
      const fourWheelers = vehicles.filter(v => v.vehicle_type === "Four Wheeler").length;
      
      const exitedLogs = vehicles.filter(v => v.exited && v.exit_time && v.entry_time);
      const avgDurationMins = exitedLogs.length > 0 
        ? Math.round(
            exitedLogs.reduce((acc, curr) => {
              const diffMs = new Date(curr.exit_time) - new Date(curr.entry_time);
              return acc + (diffMs / 60000);
            }, 0) / exitedLogs.length
          )
        : 0;

      reportText = `### 📊 SmartPark Local Telemetry & Insights Report
*(Generated via Local Fallback Engine)*

#### 1. Executive Capacity Metrics
* **Total Transactions Registered**: ${total} logs
* **Currently Parked (Active)**: ${active} vehicles
* **Departed (Exited)**: ${exited} vehicles

#### 2. Fleet Classification & Ratios
* **Two Wheelers (Motorbikes/Scooters)**: ${twoWheelers} vehicles (${total > 0 ? Math.round((twoWheelers/total)*100) : 0}%)
* **Four Wheelers (Cars/SUVs)**: ${fourWheelers} vehicles (${total > 0 ? Math.round((fourWheelers/total)*100) : 0}%)
* **Stay Metric**: Average parking duration is **${avgDurationMins} minutes** for departed visitors.

#### 3. Traffic Observations
* **Vehicle Load**: High concentration of ${twoWheelers > fourWheelers ? "Two Wheelers" : "Four Wheelers"} inside the facility.
* **Turnover Rate**: ${active > 0 ? "Continuous activity logged with new entries" : "All vehicles currently checked out"}.

#### 4. Operational Recommendations
* **Capacitance Optimization**: Allocate dedicated zones for Two Wheelers based on entry shares.
* **Checkout Automation**: Prompt drivers to pre-register exit codes to reduce gate dwell times below the average ${avgDurationMins} minutes.
* **Security Auditing**: Periodically verify active logs matching physical parking lot status.
`;
    }

    return NextResponse.json({
      report: reportText,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
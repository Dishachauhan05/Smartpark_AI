import { supabase } from "@/lib/supabase";

// Create Vehicle
export async function createVehicle(formData) {
  try {
    const { data: visitor, error: visitorError } = await supabase
      .from("visitors")
      .insert({
        name: formData.name,
        phone: formData.phone,
        purpose: formData.purpose,
      })
      .select()
      .single();

    if (visitorError) throw visitorError;

    const { error: vehicleError } = await supabase
      .from("vehicles")
      .insert({
        visitor_id: visitor.id,
        vehicle_number: formData.vehicleNumber,
        vehicle_type: formData.vehicleType,
        status: "ACTIVE",
      });

    if (vehicleError) throw vehicleError;

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: error.message,
    };
  }
}

// Get All Vehicles
export async function getVehicles() {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .order("entry_time", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

// Search Vehicle + Visitor Details
export async function searchVehicle(vehicleNumber) {
  try {
    const { data: vehicles, error } = await supabase
      .from("vehicles")
      .select("*")
      .ilike("vehicle_number", vehicleNumber);

    if (error) {
      console.error(error);
      return null;
    }

    if (!vehicles || vehicles.length === 0) {
      return null;
    }

    const vehicle = vehicles[0];

    let visitor = null;

    if (vehicle.visitor_id) {
      const { data: visitorData } = await supabase
        .from("visitors")
        .select("*")
        .eq("id", vehicle.visitor_id)
        .single();

      visitor = visitorData;
    }

    return {
      ...vehicle,
      visitor,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Exit Vehicle
export async function exitVehicle(vehicleId) {
  const { error } = await supabase
    .from("vehicles")
    .update({
      exited: true,
      status: "EXITED",
      exit_time: new Date().toISOString(),
    })
    .eq("id", vehicleId);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}

// Dashboard Stats
export async function getDashboardStats() {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*");

  if (error) {
    console.error(error);

    return {
      total: 0,
      active: 0,
      exited: 0,
      today: 0,
    };
  }

  const total = data.length;

  const active = data.filter(
    (vehicle) => !vehicle.exited
  ).length;

  const exited = data.filter(
    (vehicle) => vehicle.exited
  ).length;

  const today = data.filter((vehicle) => {
    const vehicleDate = new Date(
      vehicle.entry_time
    ).toDateString();

    const currentDate =
      new Date().toDateString();

    return vehicleDate === currentDate;
  }).length;

  return {
    total,
    active,
    exited,
    today,
  };
}
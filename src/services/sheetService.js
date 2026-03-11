const SHEET_URL =
  "https://opensheet.elk.sh/1Ud2vm97__ZEqmTQvdYzCOTNj3kGgjoxzJsZucSALThQ/Bugs";

export async function fetchBugs() {
  const response = await fetch(SHEET_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch bugs");
  }
  return response.json();
}

// Placeholders for future use
export async function addBug(/* bug */) {
  throw new Error("addBug is not implemented yet");
}

export async function updateBug(/* bug */) {
  throw new Error("updateBug is not implemented yet");
}


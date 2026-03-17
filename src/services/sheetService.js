import { createBug, getBugs } from "../api/bugService";

const SHEET_URL =
  "https://opensheet.elk.sh/1Ud2vm97__ZEqmTQvdYzCOTNj3kGgjoxzJsZucSALThQ/Bugs";

export async function fetchBugs() {
  try {
    const res = await getBugs();
    return res.data;
  } catch (e) {
    const response = await fetch(SHEET_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch bugs");
    }
    return response.json();
  }
}

export async function addBug(bug) {
  const res = await createBug(bug);
  return res.data;
}

export async function updateBug(/* bug */) {
  throw new Error("updateBug is not implemented yet");
}


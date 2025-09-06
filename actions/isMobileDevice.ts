"use server";

import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

export async function isMobileDevice() {
  const uaData = await headers();
  const ua = uaData.get("user-agent") ?? "";
  const device = new UAParser(ua).getDevice();
  return device.type === "mobile";
}

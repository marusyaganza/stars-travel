export function extractFormData(formData: FormData) {
  const keys = Array.from(formData.keys());
  const result: Record<string, string> = {};
  keys.forEach((key) => {
    const val = formData.get(key);
    if (val && key !== "csrf_token" && typeof val === "string") {
      result[key] = val;
    }
  });
  return result;
}

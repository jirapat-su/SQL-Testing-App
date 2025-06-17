// Skip Husky install in production and Vercel
if (process.env.NODE_ENV === "production" || process.env.VERCEL === "1") {
  process.exit(0);
}

try {
  const husky = (await import("husky")).default;
  console.log(husky());
} catch (e) {
  if (e.code !== "ERR_MODULE_NOT_FOUND") throw e;
  console.error("Husky is not installed.");
  exit(1)
}
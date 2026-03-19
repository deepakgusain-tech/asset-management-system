import cron from "node-cron"
import { checkWarrantyExpiry } from "./warranty-check"

cron.schedule("0 0 * * *", async () => {
  console.log("Running warranty check...")
  await checkWarrantyExpiry()
})
console.log("CRON FILE LOADED")
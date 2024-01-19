import { renderComPreventInactivity } from "./cronFunctions.js";
import cron from "node-cron"

export const startCron = () => {
    cron.schedule('*/14 * * * *', () => {
        renderComPreventInactivity();
    });
} 
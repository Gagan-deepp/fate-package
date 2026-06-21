import AppError from "../middleware/error.middleware.js";
import logger from "../middleware/logger.js";
import { db } from "../server.js";

/**
 * Establishes a connection to the database using the Prisma Client.
 * Throws a centralized AppError if the connection fails.
 */
export const connectDB = async () => {
    try {
        await db.$connect();
        logger.info("Database connection established successfully...");
    } catch (error) {
        logger.error("Error while connecting to database ==> ", error);
        throw new AppError("Database connection failed", 500);
    }
};

import Express from "express";
import dotenv from "dotenv";

import { router as apiRouter } from "./routers/apisV1.router.js";
import { dbConnection } from "./db/dbConnection.js"
import { ApiError } from "./utils/apiErrors.js";
import globalErrorHandle from "./middlewares/globalErrorHandle.middleware.js";

dotenv.config();

const app = Express();

app.use(Express.json());

await dbConnection()

app.use("/api", apiRouter);

app.use((req, res, next) => {
    next(new ApiError("invalid route", 404));
});

app.use(globalErrorHandle);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// handle errors outside express
process.on("unhandledRejection", (err) => {
    console.error(`${err.name} | ${err.message}`);

    // close the program after finish all requests
    server.close(() => {
        process.exit(0);
    });
});
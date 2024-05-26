import express, { Request, Response, NextFunction, Application } from "express";
import http from "http";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import workoutRouter from "./routes/workout.route";

const serverPort: number = parseInt(process.env.SERVER_PORT || "4000", 10);

class AppServer {
    private server: http.Server | null = null;
    private app: Application;

    constructor() {
        this.app = express();
    }

    private async init(): Promise<void> {
        // Middleware to enhance security
        this.app.use(helmet());
        this.app.use(helmet.hidePoweredBy());

        // Middleware to handle CORS
        this.app.use(
            cors({
                credentials: true,
                origin: "http://localhost:19006",
            }),
        );

        // Home
        this.app.use("/home", (req: Request, res: Response) => {
            res.send({
                message: "Welcome",
            });
        });

        // Workouts
        this.app.use("/api/v1/workouts", workoutRouter);

        // Custom 404
        this.app.use((_req: Request, res: Response, _next: NextFunction) => {
            res.status(404).send({
                message: "Cannot find route",
            });
        });
    }

    public async start(): Promise<http.Server> {
        await this.init();

        return (this.server = this.app.listen(serverPort, () => {
            console.log(
                `Server is now running on port ${serverPort} with ENV ${process.env.NODE_ENV} at ${new Date()}`,
            );
        }));
    }

    public stop(): void {
        this.server?.close();
    }
}

export default AppServer;

import AppServer from "./server";

const server = new AppServer();

server.start().catch((err: Error) => {
    console.error(err);
});

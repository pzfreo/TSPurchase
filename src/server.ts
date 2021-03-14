import * as express from "express";
import {Request, Response} from "express";
import { createConnection } from "typeorm";
import { PurchaseOrder } from "./entity/PurchaseOrder";

const PORT = process.env.PORT || 8000

createConnection(
{
    type: "postgres",
    host: process.env.DBHOST || "localhost",
    port: parseInt(process.env.DBPORT) || 5432,
    username: process.env.DBUSER || "postgres",
    password: process.env.DBPASSWORD || "mypass",
    database: process.env.DBDATABASE || "postgres",
    entities: [
        PurchaseOrder
    ],
    synchronize: true,
    logging: false
}
).then(connection => {

    const PORepository = connection.getRepository(PurchaseOrder);

    const app = express();
    app.use(express.json());

    app.get("/purchase", async function(req: Request, res: Response) {
        const purchases = await PORepository.find();
        res.json(purchases);
    });

    app.get("/purchase/:id", async function(req: Request, res: Response) {
        const po = await PORepository.findOne(req.params.id);
        res.json(po);
    });

    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });

}).catch(error => console.log(error));



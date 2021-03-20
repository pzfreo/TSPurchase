import * as express from "express";
import {Request, Response} from "express";
import { createConnection, Repository } from "typeorm";
import { PurchaseOrder } from "./entity/PurchaseOrder";
import { routes } from "./routes"

const PORT = process.env.PORT || 8000
var PORepository;
var isConnected;

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

    PORepository = connection.getRepository(PurchaseOrder);
    isConnected = true;

    createPO(PORepository); // make sure there is at least one entry
    
    const app = express();
    app.use(express.json());
    app.use('/purchase', routes);
    
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });

}).catch(error => console.log(error));


function createPO( PORepository:Repository<PurchaseOrder>) {
    let po = new PurchaseOrder();
    po.poNumber = "PO879888"
    po.customerNumber = "c1";
    po.date = new Date();
    po.isDeleted = false;
    po.paymentReference = "PREF001";
    po.lineItem = "00001";
    po.quantity = 5;
    
    (async () => {
        try {
            const p = await PORepository.create(po);
            //console.log(p);
            const result = await PORepository.save(p);
            // console.log(JSON.stringify(result));
        } catch (e) {
            // Deal with the fact the chain failed
        }
    })();
}

export { PORepository };
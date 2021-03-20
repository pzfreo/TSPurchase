"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typeorm_1 = require("typeorm");
const PurchaseOrder_1 = require("./entity/PurchaseOrder");
const routes_1 = require("./routes");
const PORT = process.env.PORT || 8000;
var PORepository;
exports.PORepository = PORepository;
var isConnected;
typeorm_1.createConnection({
    type: "postgres",
    host: process.env.DBHOST || "localhost",
    port: parseInt(process.env.DBPORT) || 5432,
    username: process.env.DBUSER || "postgres",
    password: process.env.DBPASSWORD || "mypass",
    database: process.env.DBDATABASE || "postgres",
    entities: [
        PurchaseOrder_1.PurchaseOrder
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    exports.PORepository = PORepository = connection.getRepository(PurchaseOrder_1.PurchaseOrder);
    isConnected = true;
    createPO(PORepository); // make sure there is at least one entry
    const app = express();
    app.use(express.json());
    app.use('/', routes_1.routes);
    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });
}).catch(error => console.log(error));
function createPO(PORepository) {
    let po = new PurchaseOrder_1.PurchaseOrder();
    po.poNumber = "PO879888";
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
        }
        catch (e) {
            // Deal with the fact the chain failed
        }
    })();
}
//# sourceMappingURL=server.js.map
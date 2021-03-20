"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typeorm_1 = require("typeorm");
const PurchaseOrder_1 = require("./entity/PurchaseOrder");
const PORT = process.env.PORT || 8000;
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
    const PORepository = connection.getRepository(PurchaseOrder_1.PurchaseOrder);
    createPO(PORepository);
    const app = express();
    app.use(express.json());
    app.get("/purchase", async function (req, res) {
        const purchases = await PORepository.find();
        const purchaseIds = purchases.map(function (po) { return { "href": po.id }; });
        res.json(purchaseIds);
    });
    app.get("/purchase/:id", async function (req, res) {
        try {
            const po = await PORepository.findOne(req.params.id);
            return res.json(po);
        }
        catch (error) {
            console.error(error);
            return res.status(404).json({ error: "order not found" }); // not found
        }
    });
    app.post("/purchase", async function (req, res) {
        try {
            const po = await PORepository.create(req.body);
            const results = await PORepository.save(po);
            res.status(201).location("/purchase/" + po.id).json(po);
        }
        catch (e) {
            console.error(e);
            return res.status(400).send({ error: "json not well-formed" }); // BAD_REQUEST
        }
    });
    app.put("/purchase/:id", async function (req, res) {
        try {
            const po = await PORepository.findOne(req.params.id);
            try {
                PORepository.merge(po, req.body);
                const results = await PORepository.save(po);
                return res.send(results);
            }
            catch (error) {
                console.error(error);
                return res.status(400).send({ error: "json not well-formed" }); // BAD_REQUEST  
            }
        }
        catch (error) {
            return res.status(404).send({ error: "uuid not found" }); // NOT_FOUND
        }
    });
    app.delete("/purchase/:id", async function (req, res) {
        try {
            const po = await PORepository.findOne(req.params.id);
            if (po.isDeleted) {
                return res.status(410).json({ error: "PO already deleted" }); // GONE
            }
            po.isDeleted = true;
            try {
                const results = await PORepository.save(po);
                return res.sendStatus(200); // OK
            }
            catch (error) {
                console.error(error);
                return res.status(500).send({ error: "unknown error updating db" }); // Server error
            }
        }
        catch (error) {
            return res.status(404).send({ error: "uuid not found" }); // NOT_FOUND
        }
    });
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
//# sourceMappingURL=server copy.js.map
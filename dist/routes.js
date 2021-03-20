"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const server_1 = require("./server");
const routes = express_1.Router();
exports.routes = routes;
routes.get("/", async function (req, res) {
    const purchases = await server_1.PORepository.find();
    const purchaseIds = purchases.map(function (po) { return { "href": po.id }; });
    res.json(purchaseIds);
});
routes.get("/:id", async function (req, res) {
    try {
        const po = await server_1.PORepository.findOne(req.params.id);
        return res.json(po);
    }
    catch (error) {
        console.error(error);
        return res.status(404).json({ error: "order not found" }); // not found
    }
});
routes.post("/", async function (req, res) {
    try {
        const po = await server_1.PORepository.create(req.body);
        const results = await server_1.PORepository.save(po);
        res.status(201).location("/purchase/" + po.id).json(po);
    }
    catch (e) {
        console.error(e);
        return res.status(400).send({ error: "json not well-formed" }); // BAD_REQUEST
    }
});
routes.put("/:id", async function (req, res) {
    try {
        const po = await server_1.PORepository.findOne(req.params.id);
        try {
            server_1.PORepository.merge(po, req.body);
            const results = await server_1.PORepository.save(po);
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
routes.delete("/:id", async function (req, res) {
    try {
        const po = await server_1.PORepository.findOne(req.params.id);
        if (po.isDeleted) {
            return res.status(410).json({ error: "PO already deleted" }); // GONE
        }
        po.isDeleted = true;
        try {
            const results = await server_1.PORepository.save(po);
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
//# sourceMappingURL=routes.js.map
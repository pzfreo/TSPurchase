
import {Router, Request, Response} from "express";
import { PurchaseOrder } from "./entity/PurchaseOrder";
import { PORepository } from "./server";

const routes = Router();

const BASE_URI = "/purchase";

routes.get(BASE_URI, async function(req: Request, res: Response) {
    const purchases = await PORepository.find();
    const purchaseIds = purchases.map( function (po:PurchaseOrder)  { return {"href": po.id}});
    res.json(purchaseIds);
});

routes.get(BASE_URI+"/:id", async function(req: Request, res: Response) {
    try {
        const po = await PORepository.findOne(req.params.id);
        return res.json(po);    
    } catch (error) {
        console.error(error);
        return res.status(404).json({error: "order not found"}); // not found
    }
    
});

routes.post(BASE_URI, async function(req: Request, res: Response) {
    try {

        const po : PurchaseOrder = await PORepository.create(req.body);
        const results = await PORepository.save(po);
        res.status(201).location("/purchase/"+po.id).json(po);
    } catch (e) {
        console.error(e);
        return res.status(400).send({error: "json not well-formed"}); // BAD_REQUEST
    }
});

routes.put(BASE_URI+"/:id", async function(req: Request, res: Response) {
    
    try {
        const po = await PORepository.findOne(req.params.id);
        try {
            PORepository.merge(po, req.body);
            const results = await PORepository.save(po);
            return res.send(results);
        } catch (error) {
            console.error(error);
            return res.status(400).send({error: "json not well-formed"}); // BAD_REQUEST  
        }
    }
    catch (error) {
        return res.status(404).send({error: "uuid not found"}); // NOT_FOUND
    }
    
});

routes.delete(BASE_URI+"/:id", async function (req: Request , res: Response) {
    
    try {
        const po :PurchaseOrder = await PORepository.findOne(req.params.id);
        if (po.isDeleted)
        {
            return res.status(410).json({error: "PO already deleted"}); // GONE
        }
        po.isDeleted = true;
        try {
            const results = await PORepository.save(po);
            return res.sendStatus(200); // OK
        } catch (error) {
            console.error(error);
            return res.status(500).send({error: "unknown error updating db"}); // Server error
        }
    }
    catch (error) {
        return res.status(404).send({error: "uuid not found"}); // NOT_FOUND
    }

    
});
   

export { routes };
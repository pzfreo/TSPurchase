"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const request = require("supertest");
// describe("POST /purchase", () => {
//     it("sends a correctly formatted JSON", (done) => 
//     request("http://localhost:8000")
//         .post("/purchase")
//         .set('Accept','application/json')
//         .send({})
//         .expect(201)
//         .expect('Content-Type', /json/)
//         .expect('Location')
//         .expect()
//         .end(function(err, res) {
//             if (err) return done(err);
//             return done();
//         });
//     });
// });
describe("Test RMM L1", () => {
    it("POST create JSON, Return 201 CREATED, Location, body", (done) => {
        let po = {
            paymentReference: "PR001",
            poNumber: "PO0012",
            quantity: 3,
            customerNumber: "CR005",
            lineItem: "LI010",
            date: new Date()
        };
        console.log(po);
        request("http://localhost:8080")
            .post('/purchase')
            .set('Accept', 'application/json')
            .send(po)
            .expect(201)
            .expect('Content-Type', /json/)
            .expect('Location')
            .end(function (err, res) {
            if (err)
                return done(err);
            return done();
        });
    });
});
//# sourceMappingURL=purchase.js.map
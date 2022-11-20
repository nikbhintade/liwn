// let mongoose = require("mongoose");
// let User = require("../models/userModel");

// let chai = require("chai");
// let chaiHttp = require("chai-http");
// let server = require("../server");

// chai.use(chaiHttp);

// describe("demo", () => {
//     beforeEach(() => {
//         User.remove({}, (err) => {
//             console.log(err);
//         })
//     })

//     describe("/GET root", () => {
//         chai.request(server).get('/').end(
//             (err, res) => {
//                 res.should.have.status(200)
//                 if (err) {
//                     console.log(error)
//                 }
//             }
//         )
//     })
// })
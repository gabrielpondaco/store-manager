const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");

chai.use(chaiAsPromised);

const salesController = require("../../../controllers/salesController");
const salesService = require("../../../services/salesService");

describe("controllers/salesController", () => {
  beforeEach(sinon.restore);
  // describe("getAll", () => {
  //   it("deve disparar um erro caso salesController.getAll dispare um erro", () => {
  //     sinon.stub(salesService, "getAll").rejects();
  //     chai.expect(salesController.getAll({}, {})).to.eventually.be.rejected;
  //   });

  //   it("deve retornar o objeto caso o salesController.getAll retorne", async () => {
  //     sinon.stub(salesService, "getAll").resolves([{}]);
  //     const res = {
  //       status: sinon.stub().callsFake(() => res),
  //       json: sinon.stub().returns(),
  //     };
  //     await salesController.getAll({}, res);
  //     chai.expect(res.status.getCall(0).args[0]).to.equal(200);
  //     chai.expect(res.json.getCall(0).args[0]).to.deep.equal([{}]);
  //     // chai.expect(salesController.getAll({}, {})).to.eventually.deep.equal([{}]);
  //   });
  // });
  describe("add", () => {
    it("deve disparar um erro caso salesService.validateBodyAdd dispare um erro", () => {
      sinon.stub(salesService, "validateBodyAdd").rejects();
      chai.expect(salesController.add({}, {}, {})).to.eventually.be.rejected;
    });
    it("deve disparar um erro caso salesService.getById dispare um erro", () => {
      sinon.stub(salesService, "validateBodyAdd").resolves();
      sinon.stub(salesService, "getById").rejects();
      chai.expect(salesController.add({}, {}, {})).to.eventually.be.rejected;
    });
    it("deve disparar um erro caso salesService.add dispare um erro", () => {
      sinon.stub(salesService, "validateBodyAdd").resolves({});
      sinon.stub(salesService, "getById").resolves({});
      sinon.stub(salesService, "add").rejects();
      chai.expect(salesController.add({}, {}, {})).to.eventually.be.rejected;
    });

    it("deve retornar o objeto caso o salesController.add retorne", async () => {
      const req = {body:[
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ]};
      const success = {
        id: 1,
        itemsSold: req.body,
      };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      const next = sinon.stub().returns();
      sinon.stub(salesService, "validateBodyAdd").resolves();
      sinon.stub(salesService, "getById").resolves();
      sinon.stub(salesService, "add").resolves(req.body);
      await salesController.add(req, res, next);
      chai.expect(salesService.add(req.body)).to.eventually.deep.equal(success);
      chai.expect(res.status.getCall(0).args[0]).to.equal(201);
    });
  });
});

// async add(req, res, next) {
//     try {
//       await Promise.all(req.body.map((each) => salesService.validateBodyAdd(each)));
//       await Promise.all(req.body
//         .map((each) => salesService.getById(each.productId)));
//       const item = await salesService.add(req.body);
//       return res.status(201).json(item);
//     } catch (error) {
//       next(error);
//     }
//   },
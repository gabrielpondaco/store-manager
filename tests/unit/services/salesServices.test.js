const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");

chai.use(chaiAsPromised);

const salesModel = require("../../../models/salesModel");
const salesService = require("../../../services/salesService");

describe("services/seriesService", () => {
  beforeEach(sinon.restore);
  describe("getById", () => {
    it("deve disparar um erro caso salesModel.getById dispare um erro", () => {
      sinon.stub(salesModel, "getById").rejects();
      chai.expect(salesService.getById(1)).to.eventually.be.rejected;
    });

    it("deve disparar um erro quanto produto não for encontrado", () => {
      sinon.stub(salesModel, "getById").resolves(false);
      chai.expect(salesService.getById("a")).to.eventually.throw(Error);
    });

    it("deve retornar o objeto caso o salesModel.getById retorne", () => {
      sinon.stub(salesModel, "getById").resolves({});
      chai.expect(salesService.getById(1)).to.eventually.deep.equal({});
    });
  });
  describe("add", () => {
    it("deve disparar um erro caso salesModel.addSaleProduct dispare um erro", () => {
      sinon.stub(salesModel, "addSaleProduct").rejects();
      chai.expect(salesService.add("Coquinha")).to.eventually.be.rejected;
    });
    it("deve disparar um erro caso salesModel.add dispare um erro", () => {
      sinon.stub(salesModel, "add").rejects();
      chai.expect(salesService.add("Coquinha")).to.eventually.be.rejected;
    });

    it("deve retornar o objeto caso o salesModel.add retorne", () => {
      const item = [{
          productId: 1,
          quantity: 1,
      }];
      const success = {
        id: 1,
        itemsSold: item,
      };
      sinon.stub(salesModel, "addSaleProduct").resolves();
      sinon.stub(salesModel, "add").resolves();
      chai.expect(salesService.add(item)).to.eventually.deep.equal(success);
    });
  });
});

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");

chai.use(chaiAsPromised);

const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');

describe('controllers/productController', () => {
  beforeEach(sinon.restore);
  describe('getAll', () => {
    it('deve disparar um erro caso productController.getAll dispare um erro', () => {
      sinon.stub(productService, "getAll").rejects();
      chai.expect(productController.getAll({}, {})).to.eventually.be.rejected;
    });

    it('deve retornar o objeto caso o productController.getAll retorne', async () => {
      sinon.stub(productService, "getAll").resolves([{}]);
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }
      await productController.getAll({}, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal([{}]);
      // chai.expect(productController.getAll({}, {})).to.eventually.deep.equal([{}]);
    });
  });
  describe("getById", () => {
    it("deve disparar um erro caso productController.getById dispare um erro", () => {
      sinon.stub(productService, "getById").rejects();
      chai.expect(productController.getById({}, {})).to.eventually.be.rejected;
    });

    it("deve retornar o objeto caso o productController.getById retorne", async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      sinon.stub(productService, "getById").resolves({});
      await productController.getById(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.be.deep.equal({});
    });
  });
})
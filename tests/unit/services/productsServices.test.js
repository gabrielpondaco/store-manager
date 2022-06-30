const { expect } = require("chai");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");

chai.use(chaiAsPromised);

const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');

describe("services/seriesService", () => {
  beforeEach(sinon.restore);

  describe("getAll", () => {
    it("deve disparar um erro caso seriesModel.getAll dispare um erro", () => {
      sinon.stub(productModel, "getAll").rejects();
      chai.expect(productService.getAll()).to.eventually.be.rejected;
    });

    it("deve retornar o id caso o productModel.getAll retorn o id", () => {
      sinon.stub(productModel, "getAll").resolves([{}]);
      chai.expect(productService.getAll()).to.eventually.equal([{}]);
    });
  });

  describe("getById", () => {
    it("deve disparar um erro caso productModel.getById dispare um erro", () => {
      sinon.stub(productModel, "getById").rejects();
      chai.expect(productService.getById(1)).to.eventually.be.rejected;
    });

    it("deve disparar um erro quanto produto não for encontrado", () => {
      sinon.stub(productModel, "getById").resolves(false);
      chai.expect(productService.getById("a")).to.eventually.throw(Error);
    });

    it("deve retornar o objeto caso o productModel.getById retorne", () => {
      sinon.stub(productModel, "getById").resolves({});
      chai.expect(productService.getById(1)).to.eventually.deep.equal({});
    });
  });
  describe("add", () => {
    it("deve disparar um erro caso productModel.add dispare um erro", () => {
      sinon.stub(productModel, "add").rejects();
      chai.expect(productService.add("Coquinha")).to.eventually.be.rejected;
    });

    it("deve retornar o objeto caso o productModel.add retorne", () => {
      sinon.stub(productModel, "add").resolves({});
      chai.expect(productService.add("Coquinha")).to.eventually.deep.equal({});
    });
  });
});
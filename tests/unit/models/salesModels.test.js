const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const salesModel = require('../../../models/salesModel');
const db = require('../../../models/db');

describe('models/productModel', () => {
   
  describe('getById', () => {
    beforeEach(sinon.restore);
    it('deve disparar um erro caso db.query dispare um erro', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(salesModel.getById(1)).to.eventually.be.rejected;
    });
    it('deve retornar nada caso db.query retorne lista vazia', () => {
      sinon.stub(db, 'query').resolves([[]]);
      chai.expect(salesModel.getById(1)).to.eventually.be.undefined;
    })
    it("deve retornar um elemento caso db.query retorne com sucesso", () => {
      sinon.stub(db, 'query').resolves([{}]);
      chai.expect(salesModel.getById(1)).to.eventually.deep.equal({});
    });
  })
  describe("add", () => {
    beforeEach(sinon.restore);
    it("deve disparar um erro caso db.query dispare um erro", () => {
      sinon.stub(db, "query").rejects();
      chai.expect(salesModel.add(1)).to.eventually.be.rejected;
    });
    it("deve retornar nada caso db.query retorne lista vazia", () => {
      sinon.stub(db, "query").resolves([[]]);
      chai.expect(salesModel.add(1)).to.eventually.be.undefined;
    });
    it("deve retornar um elemento caso db.query retorne com sucesso", () => {
      const item = {
          productId: 1,
          quantity: 1,
        };
      sinon.stub(db, "query").resolves(item);
      chai
        .expect(salesModel.add({ name: 'coquinha' }))
        .to.eventually.deep.equal(item);
    });
  });
  describe("addSaleProduct", () => {
    beforeEach(sinon.restore);
    it("deve disparar um erro caso db.query dispare um erro", () => {
      sinon.stub(db, "query").rejects();
      chai.expect(salesModel.addSaleProduct(1)).to.eventually.be.rejected;
    });
    it("deve retornar nada caso db.query retorne lista vazia", () => {
      sinon.stub(db, "query").resolves([[]]);
      chai.expect(salesModel.addSaleProduct(1)).to.eventually.be.undefined;
    });
    it("deve retornar um elemento caso db.query retorne com sucesso", () => {
      
      sinon.stub(db, "query").resolves(1);
      chai
        .expect(salesModel.addSaleProduct(1))
        .to.eventually.deep.equal(1);
    });
  });
})
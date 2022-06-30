const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const productsModel = require('../../../models/productModel');
const db = require('../../../models/db');

describe('models/productModel', () => {
  describe('getAll', () => {
    beforeEach(sinon.restore);
    it('deve disparar um erro caso db.query dispare um erro', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.getAll()).to.eventually.be.rejected;
    });
    it('deve retornar nada caso db.query retorne lista vazia', () => {
      sinon.stub(db, 'query').resolves([[]]);
      chai.expect(productsModel.getAll()).to.eventually.be.undefined;
    });
    it("deve retornar uma lista caso db.query retorne com sucesso", () => {
      sinon.stub(db, 'query').resolves([[{}]]);
      chai.expect(productsModel.getAll()).to.eventually.deep.equal({});
    });
  })
    
  describe('getById', () => {
    beforeEach(sinon.restore);
    it('deve disparar um erro caso db.query dispare um erro', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.getById(1)).to.eventually.be.rejected;
    });
    it('deve retornar nada caso db.query retorne lista vazia', () => {
      sinon.stub(db, 'query').resolves([[]]);
      chai.expect(productsModel.getById(1)).to.eventually.be.undefined;
    })
    it("deve retornar um elemento caso db.query retorne com sucesso", () => {
      sinon.stub(db, 'query').resolves([{}]);
      chai.expect(productsModel.getById(1)).to.eventually.deep.equal({});
    });
  })
})
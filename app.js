const express = require('express');
const productRouter = require('./routes/productRoute');
const salesRouter = require('./routes/salesRoute');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
app.use(express.json());
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);
app.use('/sales', salesRouter);
app.use(errorMiddleware);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const OrderRouter = require('./OrderRouter');
const PaymentRouter = require('./PaymentRouter');
const CommentRouter = require('./CommentRouter');
const InventoryRouter = require('./InventoryRouter');
const InventoryBuyTicketRouter = require('./InventoryBuyTicketRouter');

const routes = (app) => {
  app.use('/api/user', UserRouter);
  app.use('/api/product', ProductRouter);
  app.use('/api/order', OrderRouter);
  app.use('/api/payment', PaymentRouter);
  app.use('/api/comment', CommentRouter);
  app.use('/api/inventory', InventoryRouter);
  app.use('/api/inventory-buy-ticket', InventoryBuyTicketRouter);
};

module.exports = routes;

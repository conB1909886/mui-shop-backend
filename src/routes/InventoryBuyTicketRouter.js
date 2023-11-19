const express = require('express');
const router = express.Router();
const InventoryBuyTicketController = require('../controllers/InventoryBuyTicketController');

router.post('/create', InventoryBuyTicketController.createInventoryBuyTicket);
router.put('/update/:id', InventoryBuyTicketController.updateInventoryBuyTicket);
router.get('/get-details/:id', InventoryBuyTicketController.getDetailsInventoryBuyTicket);
router.delete('/delete/:id', InventoryBuyTicketController.deleteInventoryBuyTicket);
router.get('/get-all', InventoryBuyTicketController.getAllInventoryBuyTicket);
router.post('/delete-many', InventoryBuyTicketController.deleteMany);

module.exports = router;

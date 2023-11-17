const express = require('express');
const router = express.Router();
const InventoryController = require('../controllers/InventoryController');

router.post('/create', InventoryController.createInventory);
router.put('/update/:id', InventoryController.updateInventory);
router.get('/get-details/:id', InventoryController.getDetailsInventory);
router.delete('/delete/:id', InventoryController.deleteInventory);
router.get('/get-all', InventoryController.getAllInventory);
router.post('/delete-many', InventoryController.deleteMany);

module.exports = router;

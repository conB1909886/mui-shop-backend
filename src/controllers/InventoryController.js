const InventoryService = require('../services/InventoryService');

const createInventory = async (req, res) => {
  try {
    const { name, address, maxAmount, keeper } = req.body;
    if (!name || !address || !maxAmount || !keeper) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The input is required',
      });
    }
    const response = await InventoryService.createInventory(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateInventory = async (req, res) => {
  try {
    const inventoryId = req.params.id;
    const data = req.body;
    if (!inventoryId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The inventoryId is required',
      });
    }
    const response = await InventoryService.updateInventory(inventoryId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsInventory = async (req, res) => {
  try {
    const inventoryId = req.params.id;
    if (!inventoryId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The inventoryId is required',
      });
    }
    const response = await InventoryService.getDetailsInventory(inventoryId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteInventory = async (req, res) => {
  try {
    const inventoryId = req.params.id;
    if (!inventoryId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The productId is required',
      });
    }
    const response = await InventoryService.deleteInventory(inventoryId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteMany = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!ids) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The ids is required',
      });
    }
    const response = await InventoryService.deleteManyInventory(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllInventory = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await InventoryService.getAllInventory(
      Number(limit) || null,
      Number(page) || 0,
      sort,
      filter,
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createInventory,
  updateInventory,
  getDetailsInventory,
  deleteInventory,
  getAllInventory,
  deleteMany,
};

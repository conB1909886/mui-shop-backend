const InventoryBuyTicketService = require('../services/InventoryBuyTicketService');

const createInventoryBuyTicket = async (req, res) => {
  try {
    const { ticketId, date, inventory, products } = req.body;
    if (!ticketId || !date || !inventory || !products?.length) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The input is required',
      });
    }
    const response = await InventoryBuyTicketService.createInventoryBuyTicket(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateInventoryBuyTicket = async (req, res) => {
  try {
    const inventoryId = req.params.id;
    const data = req.body;
    if (!inventoryId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The inventoryId is required',
      });
    }
    const response = await InventoryBuyTicketService.updateInventoryBuyTicket(inventoryId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsInventoryBuyTicket = async (req, res) => {
  try {
    const inventoryId = req.params.id;
    if (!inventoryId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The inventoryId is required',
      });
    }
    const response = await InventoryBuyTicketService.getDetailsInventoryBuyTicket(inventoryId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteInventoryBuyTicket = async (req, res) => {
  try {
    const inventoryId = req.params.id;
    if (!inventoryId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The productId is required',
      });
    }
    const response = await InventoryBuyTicketService.deleteInventoryBuyTicket(inventoryId);
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
    const response = await InventoryBuyTicketService.deleteManyInventoryBuyTicket(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllInventoryBuyTicket = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await InventoryBuyTicketService.getAllInventoryBuyTicket(
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
  createInventoryBuyTicket,
  updateInventoryBuyTicket,
  getDetailsInventoryBuyTicket,
  deleteInventoryBuyTicket,
  getAllInventoryBuyTicket,
  deleteMany,
};

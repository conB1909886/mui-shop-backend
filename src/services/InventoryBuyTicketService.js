const InventoryBuyTicket = require('../models/InventoryBuyTicketModel');
const Product = require('../models/ProductModel');

const createInventoryBuyTicket = (newInventoryBuyTicket) => {
  return new Promise(async (resolve, reject) => {
    const { ticketId, date, inventory, products, note } = newInventoryBuyTicket;
    try {
      const promises = products.map(async (product) => {
        await Product.findOneAndUpdate(
          {
            _id: product.product,
          },
          {
            $inc: {
              countInStock: +product.amount,
            },
            $set: {
              price: product.price,
              inventory: inventory,
            },
          },
          { new: true },
        );
      });
      await Promise.all(promises);

      const newInventoryBuyTicket = await InventoryBuyTicket.create({
        ticketId,
        date,
        inventory,
        products,
        note,
      });
      if (newInventoryBuyTicket) {
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: newInventoryBuyTicket,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateInventoryBuyTicket = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkInventoryBuyTicket = await InventoryBuyTicket.findOne({
        _id: id,
      });
      if (checkInventoryBuyTicket === null) {
        resolve({
          status: 'ERR',
          message: 'The inventory is not defined',
        });
      }

      const updatedInventoryBuyTicket = await InventoryBuyTicket.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: updatedInventoryBuyTicket,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteInventoryBuyTicket = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkInventoryBuyTicket = await InventoryBuyTicket.findOne({
        _id: id,
      });
      if (checkInventoryBuyTicket === null) {
        resolve({
          status: 'ERR',
          message: 'The inventory is not defined',
        });
      }

      await InventoryBuyTicket.findByIdAndDelete(id);
      resolve({
        status: 'OK',
        message: 'Delete inventory success',
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyInventoryBuyTicket = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await InventoryBuyTicket.deleteMany({ _id: ids });
      resolve({
        status: 'OK',
        message: 'Delete inventory success',
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsInventoryBuyTicket = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const inventory = await InventoryBuyTicket.findOne({
        _id: id,
      });
      if (inventory === null) {
        resolve({
          status: 'ERR',
          message: 'The inventory is not defined',
        });
      }

      resolve({
        status: 'OK',
        message: 'SUCESS',
        data: inventory,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllInventoryBuyTicket = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalInventoryBuyTicket = await InventoryBuyTicket.count();
      let allInventoryBuyTicket = [];
      if (filter) {
        const label = filter[0];
        let regex = new RegExp(`${filter[1]}`, 'ig');
        const allObjectFilter = await InventoryBuyTicket.find({
          [label]: { $regex: regex },
        })
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: 'OK',
          message: 'Success',
          data: allObjectFilter,
          total: totalInventoryBuyTicket,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalInventoryBuyTicket / limit),
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allInventoryBuyTicketSort = await InventoryBuyTicket.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort)
          .sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: 'OK',
          message: 'Success',
          data: allInventoryBuyTicketSort,
          total: totalInventoryBuyTicket,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalInventoryBuyTicket / limit),
        });
      }
      if (!limit) {
        allInventoryBuyTicket = await InventoryBuyTicket.find().sort({
          createdAt: -1,
          updatedAt: -1,
        });
      } else {
        allInventoryBuyTicket = await InventoryBuyTicket.find()
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
      }
      resolve({
        status: 'OK',
        message: 'Success',
        data: allInventoryBuyTicket,
        total: totalInventoryBuyTicket,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalInventoryBuyTicket / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createInventoryBuyTicket,
  updateInventoryBuyTicket,
  getDetailsInventoryBuyTicket,
  deleteInventoryBuyTicket,
  getAllInventoryBuyTicket,
  deleteManyInventoryBuyTicket,
};

const Inventory = require('../models/InventoryModel');

const createInventory = (newInventory) => {
  return new Promise(async (resolve, reject) => {
    const { name, address, maxAmount, keeper } = newInventory;
    try {
      const newInventory = await Inventory.create({
        name,
        address,
        maxAmount,
        keeper,
      });
      if (newInventory) {
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: newInventory,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateInventory = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkInventory = await Inventory.findOne({
        _id: id,
      });
      if (checkInventory === null) {
        resolve({
          status: 'ERR',
          message: 'The inventory is not defined',
        });
      }

      const updatedInventory = await Inventory.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: updatedInventory,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteInventory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkInventory = await Inventory.findOne({
        _id: id,
      });
      if (checkInventory === null) {
        resolve({
          status: 'ERR',
          message: 'The inventory is not defined',
        });
      }

      await Inventory.findByIdAndDelete(id);
      resolve({
        status: 'OK',
        message: 'Delete inventory success',
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyInventory = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Inventory.deleteMany({ _id: ids });
      resolve({
        status: 'OK',
        message: 'Delete inventory success',
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsInventory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const inventory = await Inventory.findOne({
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

const getAllInventory = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalInventory = await Inventory.count();
      let allInventory = [];
      if (filter) {
        const label = filter[0];
        let regex = new RegExp(`${filter[1]}`, 'ig');
        const allObjectFilter = await Inventory.find({
          [label]: { $regex: regex },
        })
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: 'OK',
          message: 'Success',
          data: allObjectFilter,
          total: totalInventory,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalInventory / limit),
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allInventorySort = await Inventory.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort)
          .sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: 'OK',
          message: 'Success',
          data: allInventorySort,
          total: totalInventory,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalInventory / limit),
        });
      }
      if (!limit) {
        allInventory = await Inventory.find().sort({
          createdAt: -1,
          updatedAt: -1,
        });
      } else {
        allInventory = await Inventory.find()
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
      }
      resolve({
        status: 'OK',
        message: 'Success',
        data: allInventory,
        total: totalInventory,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalInventory / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createInventory,
  updateInventory,
  getDetailsInventory,
  deleteInventory,
  getAllInventory,
  deleteManyInventory,
};

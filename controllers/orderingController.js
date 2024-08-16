const { Basket, BasketDevice } = require("../models/models");

class orderingController {
  async create(req, res) {
    const { userData, items } = req.body;
    const deletedCount = await BasketDevice.destroy({
      where: {
        basketId: userData.userId,
      },
    });

    return res.json({ userData });
  }
}

module.exports = new orderingController();

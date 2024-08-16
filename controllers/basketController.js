const { Basket, BasketDevice, User, Device } = require("../models/models");

class BasketController {
  async deleteItem(req, res) {
    const { userId, deviceId } = req.query;

    const deletedDev = await BasketDevice.findOne({
      where: { basketId: userId, deviceId },
    });

    if (!deletedDev) {
      return res.status(404).json({ message: "Элемент не найден" });
    }

    await deletedDev.destroy();

    const cartDivice = await BasketDevice.findAll({
      where: { basketId: userId },
    });

    const deviceIds = cartDivice.map((item) => item.deviceId);
    const devices = await Device.findAll({
      where: { id: deviceIds },
    });

    const divices = cartDivice.map((item) => {
      const divice = devices.find((d) => d.id === item.deviceId);
      return {
        img: divice.img,
        price: divice.price,
        name: divice.name,
        discount: divice.discount,
        inBasketCount: item.inBasketCount,
        id: divice.id,
      };
    });

    return res.json(divices);
  }

  async create(req, res) {
    const { itemId, id } = req.body;

    let divices = [];
    await BasketDevice.create({ basketId: id, deviceId: itemId });

    const cartDivice = await BasketDevice.findAll({
      where: { basketId: id },
    });

    for (const item of cartDivice) {
      const divice = await Device.findOne({ where: { id: item.deviceId } });
      const newDivice = {
        img: divice.img,
        price: divice.price,
        name: divice.name,
        discount: divice.discount,
        inBasketCount: item.inBasketCount,
        id: divice.id,
      };
      divices.push(newDivice);
    }
    return res.json(divices);
  }
}

module.exports = new BasketController();

const { Device, DeviceInfo, Type, Brand } = require("../models/models");
const { Op } = require("sequelize");

class DeviceController {
  async create(req, res) {}
  async getAll(req, res) {
    const devices = await Device.findAll();
    return res.json(devices);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return res.json(device);
  }

  async getAllByDiscount(req, res) {
    const devices = await Device.findAll({
      where: {
        discount: {
          [Op.ne]: 0,
        },
      },
    });
    return res.json(devices);
  }

  async getProducts(req, res) {
    const { catalogId } = req.params;
    const { value, filterId } = req.query;
    let devices;
    if (!value && !filterId) {
      devices = await Device.findAll({
        where: { typeId: catalogId },
      });

      return res.json(devices);
    } else {
      const brands = await Brand.findAll({
        where: { id: filterId },
      });

      const names = brands.map(({ name }) => {
        return name;
      });

      const info = await DeviceInfo.findAll({
        where: {
          title: names,
          description: value,
        },
      });

      const deviceID = info.map(({ deviceId }) => {
        return deviceId;
      });

      devices = await Device.findAll({
        where: { id: deviceID },
      });
      return res.json(devices);
    }
  }

  async getSearch(req, res) {
    const { text } = req.body;

    if (!text) {
      return res.json([]);
    }

    try {
      const devices = await Device.findAll({
        where: {
          name: {
            [Op.like]: `%${text}%`,
          },
        },
      });
      const result = devices.map((device) => ({
        id: device.id,
        name: device.name,
      }));

      return res.json(result);
    } catch (error) {
      console.error("Ошибка при поиске устройств:", error);
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }
}

async function delete1() {
  await BasketDevice.destroy({ where: {}, truncate: true });
}

module.exports = new DeviceController();

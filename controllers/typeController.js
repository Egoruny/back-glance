const { Type, Device, Brand, DeviceInfo } = require("../models/models");

class TypeController {
  async getAll(req, res) {
    const types = await Type.findAll();
    const newTpes = types.map(({ name, id }) => {
      return { name, id };
    });
    return res.json(newTpes);
  }

  async gettest(req, res) {
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
}

module.exports = new TypeController();

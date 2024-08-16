const { Brand, TypeBrand } = require("../models/models");

class BrandController {
  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }
  async getBt(req, res) {
    const bt = await TypeBrand.findAll();
    return res.json(bt);
  }
}

module.exports = new BrandController();

const { Brand, Device, TypeBrand } = require("../models/models");

class TypeBrandController {
  async getfilters(req, res) {
    const { catalogId } = req.params;

    const tb = await TypeBrand.findAll({
      where: { typeId: catalogId },
    });

    const brandIds = tb.map((item) => item.brandId);
    const filters = await Brand.findAll({
      where: {
        id: brandIds,
      },
    });
    return res.json(
      filters.map(({ name, id, value }) => {
        return { name, id, value };
      })
    );
  }
}

module.exports = new TypeBrandController();

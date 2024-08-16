const { User, Basket, BasketDevice, Device } = require("../models/models");


class UserController {
  async registration(req, res) {
    const { email, password, cartItems } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Некорректный email или password" });
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return res
        .status(400)
        .json({ error: "Пользователь с таким email уже существует" });
    }
    const user = await User.create({ email, password });
    const basket = await Basket.create({ userId: user.id });

    for (const item of cartItems) {
      await BasketDevice.create({
        inBasketCount: item.inBasketCount,
        deviceId: item.id,
        basketId: basket.id,
      });
    }
    return res.status(200).json(user);
  }
  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "Пользователь не найден" });
    }
    let comparePassword = String(password) === user.password;
    if (!comparePassword) {
      return res.status(400).json({ error: "Неверный пароль" });
    }

    let divices = [];
    const userBasket = await Basket.findOne({ where: { userId: user.id } });
    const cartDivice = await BasketDevice.findAll({
      where: { basketId: userBasket.id },
    });

    for (const item of cartDivice) {
      const divice = await Device.findOne({ where: { id: item.deviceId } });
      const newDivice = {
        img: divice.img,
        price: divice.price,
        name: divice.name,
        discount: divice.discount,
        inBasketCount: item.inBasketCount,
        id:divice.id
      };
      divices.push(newDivice);
    }

    return res.json({ divices, user:user.id });
  }

}
module.exports = new UserController();

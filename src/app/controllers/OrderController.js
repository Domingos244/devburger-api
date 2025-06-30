import * as Yup from 'yup';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Order from '../models/schemas/Order.js';
import Category from '../models/Category.js';

class OrderController {
  async store(request, response) {
    const schema = Yup.object({
      products: Yup.array().required().of(
        Yup.object({
          id: Yup.number().required(),
          quantity: Yup.number().required(),
        }),
      ),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { products } = request.body;

    const productIds = products.map(product => product.id);

    const foundProducts = await Product.findAll({
      where: { id: productIds },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
      ],
    });

    const formattedProducts = foundProducts.map(product => {
      const match = products.find(p => p.id === product.id);

      return {
        id: product.id,
        name: product.name,
        category: product.category.name,
        price: product.price,
        url: product.url,
        quantity: match.quantity,
      };
    });

    const order = {
      user: {
        id: request.userId,
        name: request.userName,
      },
      products: formattedProducts,
      status: 'Pedido realizado',
    };

    const createdOrder = await Order.create(order);

    return response.status(201).json(createdOrder);
  }

  async index(request, response) {
    const orders = await Order.find();
    return response.json(orders);
  }

  async update(request, response) {
    const schema = Yup.object({
      status: Yup.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const user = await User.findByPk(request.userId);

    if (!user || !user.admin) {
      return response.status(401).json({ error: 'Not authorized' });
    }

    const { id } = request.params;
    const { status } = request.body;

    try {
      await Order.updateOne({ _id: id }, { status });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }

    return response.json({ message: 'Status updated successfully' });
  }
}

export default new OrderController();


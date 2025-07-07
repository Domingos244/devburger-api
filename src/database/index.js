import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import configDatabase from '../config/database.js';
import User from '../app/models/User.js';
import Product from '../app/models/Product.js';
import Category from '../app/models/Category.js';

const models = [User, Product, Category];

class Checkout {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    const env = process.env.NODE_ENV || 'development';
    const config = configDatabase[env];

    this.connection = new Sequelize(config);

    this.connection.authenticate()
      .then(() => console.log('✅ PostgreSQL conectado com sucesso!'))
      .catch((err) => console.error('❌ Erro no PostgreSQL:', err));

    models
      .map((model) => model.init(this.connection))
      .forEach((model) => {
        if (model.associate) {
          model.associate(this.connection.models);
        }
      });
  }

  mongo() {
    mongoose.connect('mongodb://localhost:27017/devburger')
      .then(() => console.log('✅ MongoDB conectado com sucesso!'))
      .catch((err) => console.error('❌ Erro no MongoDB:', err));
  }
}

export default new Checkout();

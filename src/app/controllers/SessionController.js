import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // ✅ Correção aqui
import authConfig from '../../config/auth.js'; // se for ESModules
// ou const authConfig = require('../../config/auth');

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const isValid = await schema.isValid(request.body);

    const emailOrPasswordIncorrect = () => {
      return response.status(401).json({
        error: 'make sure your email or password are correct',
      });
    };

    if (!isValid) {
      return emailOrPasswordIncorrect();
    }

    const { email, password } = request.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return emailOrPasswordIncorrect();
    }

    const isSamePassword = await user.checkPassword(password);

    if (!isSamePassword) {
      return emailOrPasswordIncorrect();
    }

    return response.status(201).json({
      id: user.id,
      name: user.name,
      email,
      admin: user.admin,
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();

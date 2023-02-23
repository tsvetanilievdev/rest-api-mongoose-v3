import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password required!' });
  }

  try {
    const user = await User.create({ email, password })
    const token = newToken(user);
    return res.status(201).send({ token })
  } catch (error) {
    return res.status(400).end();
  }
}

export const signin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password required!' });
  }
  try {
    const user = await User.findOne({ email }).exec();
    const isSame = await user.checkPassword(password);
    if (!isSame) {
      throw new Error('Email or password mismatch!');
    }
    const token = newToken(user);
    return res.status(201).send({ token })
  } catch (error) {
    console.error(error);
    return res.status(401).send({ message: 'Email or password mismatch!' });
  }
}

export const protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  const token = req.headers.authorization.split('Bearer ')[1];
  if (!token) {
    return res.status(401).end();
  }

  try {
    const payload = await verifyToken(token);
    const user = await User.findById(payload.id)
      .select({ password: 0 })
      .lean()
      .exec();
    req.user = user;
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).end();

  }
}

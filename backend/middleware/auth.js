import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const { user_id } = jwt.verify(token, process.env.TOKEN_KEY);
    req.body.id = user_id;
  }
  next();
};

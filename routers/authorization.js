const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const authorization = async (req, res, next) => {
  const auth = req.get('Authorization');

  if (!auth || !auth.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Unauthorized-Bearer token 인증을 사용하십시오.' });
  }

  const token = auth.split(' ')[1];

  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res.status(403).json({
        message: 'Unauthorized-token이 유효하지 않습니다.',
      });
    } else {
      req.userID = decoded.uid;
      req.role = decoded.rol;
      next();
    }
  });
};

module.exports = authorization;

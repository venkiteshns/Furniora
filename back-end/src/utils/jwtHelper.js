import jwt from "jsonwebtoken";

export const createToken = (user) => {
  const { name, _id } = user;

  const payload = {
    _id,
    name,
  };

  let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5m" });
  return token;
};

export const decodeToken = (token) => {
  let decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

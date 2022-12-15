import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";
import User from "../models/User";

export const verifyToken = async (req, res, next) => {
  try {
    //Verificamos que exista la cabecera 'token'
    const token = req.headers["x-access-token"];
    if (!token) return res.status(405).json({ message: "No token provided" });

    //Verificar la información que nos envía el usuario dentro del token
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    //Comprobamos que exista el usuario
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "No user found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }

  return res.status(403).json({ message: "Requiere admin role" });
};

export const isUser = async (req, res, next) => {};

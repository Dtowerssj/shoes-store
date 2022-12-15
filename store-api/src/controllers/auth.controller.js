import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";

export const signUp = async (req, res) => {
  const { name, email, password, roles } = req.body;

  const newUser = new User({
    name,
    email,
    password: await User.encryptPassword(password),
  });

  // Encontrando el rol
  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();
  console.log(savedUser);

  //Generamos el token
  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400,
  });
  res.status(200).json(token);
};

export const signIn = async (req, res) => {
  //Verificar si el usuario existe
  const userFound = await User.findOne({ email: req.body.email }).populate(
    "roles"
  );
  if (!userFound) return res.status(400).json({ message: "User not found" });
  const roles = [];
  userFound.roles.forEach((e) => {
    roles.push(e.name);
  });

  //Verificar que su contraseña coincida
  const matchPassword = await User.comparePasswords(
    req.body.password,
    userFound.password
  );
  if (!matchPassword)
    return res.status(401).json({ token: null, message: "Invalid password" });

  //Generamos el token
  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400,
  });
  res.json({ token, roles, message: "login exitoso" });
};

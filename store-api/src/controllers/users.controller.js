import User from "../models/User"

export const getUsers = async (req, res) => {
    const users = await User.find()
    res.json(users)
}

export const getUserById = (req, res) => {

}

export const createUser = (req, res) => {

}

export const updateUserById = (req, res) => {

}

export const deleteUserId = (req, res) => {

}

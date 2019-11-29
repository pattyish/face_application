import User from "../models/userSchame";
import Dboperations from "../db/dbOperation";

const DbQuery = new Dboperations("users");
export default class Usercontroller {
  async registerUser(req, res) {
    const { body } = req;
    const userInfo = new User(body);
    const saveUser = await DbQuery.insertData(userInfo);

    if (!userInfo)
      return res
        .status(500)
        .json({ status: 500, message: "there is an error on db operation" });
    res.status(201).json({
      status: 201,
      message: "user created successfull",
      data: { saveUser }
    });
  }
}

"use strict";

const User = use("App/Models/User");

class UserController {
  async store({ request, response, auth }) {
    const data = request.only(["name", "password", "email"]);

    try {
      const user = await User.create(data);

      const token = await auth.attempt(data.email, data.password);

      return response.status(200).json({
        message: "Success",
        auth: { ...token },
        user
      });
    } catch (err) {
      return response.json({
        error: err
      });
    }
  }
}

module.exports = UserController;

"use strict";

const User = use("App/Models/User");

class SessionController {
  async store({ request, response, auth }) {
    const { email, password } = request.all();

    const user = await User.findBy("email", email);

    if (!user) {
      return response.status(404).json({
        error: "User not found"
      });
    }

    const token = await auth.attempt(email, password);

    return response.status(200).json({
      message: "success",
      auth: { ...token },
      user
    });
  }
}

module.exports = SessionController;

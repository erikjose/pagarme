"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Subscription = use("App/Models/Subscription");
const Plan = use("App/Models/Plan");
const Env = use("Env");
const pagarme = require("pagarme");

class SubscriptionController {
  async store({ request, response, auth }) {
    const { card_hash, plan_id } = request.all();

    const user = await auth.getUser();

    try {
      const plan = await Plan.findBy("id_pagarme", plan_id);

      if (!plan) {
        return response.status(404).json({
          message: "Plan does not exist"
        });
      }

      const Pagarme = await pagarme.client.connect({
        api_key: Env.get("PAGARME_KEY")
      });

      const id_plan = plan_id.toString();

      const res = await Pagarme.subscriptions.create({
        plan_id: id_plan,
        card_hash,
        customer: {
          email: user.email
        }
      });

      await Subscription.create({
        user_id: user.id,
        plan_id: plan.id,
        status: true
      });

      return response.status(200).json({
        message: "success",
        res
      });
    } catch (err) {
      return response.status(500).json({
        error: err
      });
    }
  }

  async show({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = SubscriptionController;

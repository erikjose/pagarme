"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Plan = use("App/Models/Plan");
const Env = use("Env");
const pagarme = require("pagarme");

class PlanController {
  async store({ request, response }) {
    const data = request.all();

    try {
      const Pagarme = await pagarme.client
        .connect({
          api_key: Env.get("PAGARME_KEY")
        })
        .then(client =>
          client.plans.create({
            ...data
          })
        )
        .then(async plan => {
          await Plan.create({
            ...data,
            id_pagarme: plan.id
          });

          return response.json({
            message: "success",
            plan
          });
        });

      return Pagarme;
    } catch (err) {
      console.log(err);
    }
  }

  async show({ response }) {
    const plans = await Plan.all();

    return response.status(200).json({
      plans
    });
  }

  async index({ request, response }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = PlanController;

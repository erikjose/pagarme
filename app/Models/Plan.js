"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Plan extends Model {
  plans() {
    return this.hasMany("App/Models/Subscription");
  }
}

module.exports = Plan;

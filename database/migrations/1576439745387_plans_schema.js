"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PlansSchema extends Schema {
  up() {
    this.create("plans", table => {
      table.increments();
      table.integer("amount").notNullable();
      table.string("days").notNullable();
      table.string("name").notNullable();
      table.integer("trial_days").notNullable();
      table.integer("id_pagarme").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("plans");
  }
}

module.exports = PlansSchema;

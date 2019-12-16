"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SubscriptionSchema extends Schema {
  up() {
    this.create("subscriptions", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table
        .integer("plan_id")
        .unsigned()
        .references("id")
        .inTable("plans")
        .onDelete("CASCADE");
      table.boolean("status");
      table.timestamps();
    });
  }

  down() {
    this.drop("subscriptions");
  }
}

module.exports = SubscriptionSchema;

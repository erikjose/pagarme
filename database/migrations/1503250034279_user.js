"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", table => {
      table.increments();
      table.string("name", 255).notNullable();
      table
        .string("email", 255)
        .notNullable()
        .unique();
      table.string("password", 60).notNullable();
      table.string("token");
      table.timestamp("created_token_at");
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;

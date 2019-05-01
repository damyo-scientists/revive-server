const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Game Schema
 */
const GameSchema = new mongoose.Schema({
  currentTurn: {
    type: String,
    required: true
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
GameSchema.method({});

/**
 * Statics
 */
GameSchema.statics = {
  /**
   * Get turn
   * @param {ObjectId} id - The objectId of game.
   * @returns {Promise<Game, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((game) => {
        if (game) {
          return game;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List games in descending order
   * @param {number} skip - Number of games to be skipped.
   * @param {number} limit - Limit number of games to be returned.
   * @returns {Promise<Game[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Game
 */
module.exports = mongoose.model('Game', GameSchema);

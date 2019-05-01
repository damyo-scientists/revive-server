const Game = require('./game.model');

/**
 * Load game and append to req.
 */
function load(req, res, next, id) {
  Game.get(id)
    .then((game) => {
      req.game = game; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}


/**
 * Get game
 * @returns {Game}
 */
function get(req, res) {
  return res.json(req.game);
}

/**
 * Get game list.
 * @property {number} req.query.skip - Number of games to be skipped.
 * @property {number} req.query.limit - Limit number of games to be returned.
 * @returns {Game}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Game.list({ limit, skip })
    .then(games => res.json(games))
    .catch(e => next(e));
}

module.exports = { get, load, list };

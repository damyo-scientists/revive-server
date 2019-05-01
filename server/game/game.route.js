const express = require('express');
const gameCtrl = require('./game.controller');

const router = express.Router(); // eslint-disable-line new-cap


router.route('/')
/** GET /api/games - Get list of games */
  .get(gameCtrl.list);

router.route('/:userId')
/** GET /api/games/:userId - Get game */
  .get(gameCtrl.get);

router.param('gameId', gameCtrl.load);

module.exports = router;

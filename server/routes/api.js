const express = require('express');

const apiRouter = express.Router();

// require in middleware here
const jwtsController = require('../controllers/jwtsController');
const userController = require('../controllers/userController');
const ticketsController = require('../controllers/ticketsController');

// ADD API ROUTES HERE
apiRouter.get('/user',
  jwtsController.isLoggedIn,
  userController.getData,
  (req, res) => res.status(200).json(res.locals)
);

apiRouter.post('/tickets',
  jwtsController.isLoggedIn,
  ticketsController.addNewTicket,
  (req, res) => res.status(200).json(res.locals)
);

apiRouter.get('/tickets',
  jwtsController.isLoggedIn,
  ticketsController.getActiveTickets,
  (req, res) => res.status(200).json(res.locals)
);



module.exports = apiRouter;

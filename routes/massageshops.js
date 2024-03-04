const express = require('express');
const {
  createmassage,
  getmassage,
  getmassages,
  deletemassage,
  updatemassage
} = require('../controllers/massage');

//Include other resource routers
const appointmentRouter = require('./appointments');

const router = express.Router();

const {protect,authorize} = require('../middleware/auth');

//Re-route into other resource routers
router.use('/:hospitalId/appointments/',appointmentRouter);

router.route('/').get(getmassages).post(protect , authorize('admin') , createmassage);
router.route('/vacCenters').get(getmassages);
router.route('/:id').get(getmassage).put(protect , authorize('admin') , updatemassage).delete(protect , authorize('admin') , deletemassage);

module.exports = router;

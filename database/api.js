const express = require("express");
const router = express.Router();


const indexRouter = require('./routes/index');
const outageRouter = require('./routes/outage');
const userRouter = require('./routes/user');



// router.use('/', indexRouter);
// router.use('/outage', outageRouter);
// router.use('/user', userRouter);


router.use(indexRouter);
router.use(outageRouter);
router.use(userRouter);

module.exports = router;

const express = require('express');
const router = express.Router();
const outageController = require('../controllers/outageController');


/* http://localhost:8081/api/v1/outage */
router.get('/outage', outageController.index);

/* http://localhost:8081/api/v1/outage/id/:id */
router.get('/outage/id/:id', outageController.modify)

/* http://localhost:8081/api/v1/outage */
router.post('/outage', outageController.insert);

/* http://localhost:8081/api/v1/outage1 */
router.put('/outage1', outageController.charge);

/* http://localhost:8081/api/v1/outage2 */
router.put('/outage2', outageController.restore);

/* http://localhost:8081/api/v1/outage/id/:id */
router.delete('/outage/id/:id', outageController.delete)

module.exports = router;
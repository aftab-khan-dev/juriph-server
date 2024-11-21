const express = require('express');
const router = express.Router();
const lawyerController = require('../Controller/lawyer_controller'); // Update the path as needed

// CRUD Routes for Lawyers
router.post('/addlawyer', lawyerController.createLawyer);
router.get('/getlawyer', lawyerController.getAllLawyers);
router.get('/getLawyerById', lawyerController.getLawyerById);
router.put('/updatelawyer', lawyerController.updateLawyer);
router.delete('/deletelawyers', lawyerController.deleteLawyer);

module.exports = router;

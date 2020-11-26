const express = require('express');
const taskController = require('../controller/taskController');
const router = express.Router();

//homepage
router.get('/', taskController.task_index);

//post request to send data to our db from our views
router.post('/', taskController.task_create_post);

router.get('/create', taskController.task_create_get);

//get request for task edit
router.get('/edit/:id', taskController.task_edit_get);
//post request for task edit to update db
router.put('/edit/:id', taskController.task_edit_post);

//getting a single blog
router.get('/:id',taskController.task_details)

//delete request is made but we need to send this data in json to our front end
router.delete('/:id', taskController.task_delete);

module.exports = router;

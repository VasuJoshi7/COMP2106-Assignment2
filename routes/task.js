const express = require('express');
const router = express.Router();

//Create New Task
router.get('/create_task', async (req, res) => {
    res.render("create_task");
});



//Get all tasks
router.get('/', async (req, res) => {
    
    res.render("TaskList", { title: "List of task" });
})


module.exports = router;
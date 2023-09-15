const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

let tasks = [];

app.get('/', (req, res) => {
    res.render('index', {tasks});
});

app.get('/completed', (req, res) => {
    const completedTasks = tasks.filter(task => task.completed);
    res.render('completed', {completedTasks});
});

app.get('/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit) {
        res.render('edit', {taskToEdit});
    } else {
        res.redirect('/');
    }
});

app.post('/add', (req, res) => {
    const {taskName} = req.body;
    const newTask = {
        id: tasks.length + 1,
        name: taskName,
        completed: false,
    };
    tasks.push(newTask);
    res.redirect('/');
});

app.post('/update/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const {updatedTaskName} = req.body;
    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (taskToUpdate) {
        taskToUpdate.name = updatedTaskName;
    }
    res.redirect('/');
});

app.get('/complete/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskToComplete = tasks.find(task => task.id === taskId);
    if (taskToComplete) {
        taskToComplete.completed = true;
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

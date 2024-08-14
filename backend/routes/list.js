const router = require('express').Router();
const User = require('../modals/user');
const List = require('../modals/list');

// Task create
router.post('/addTask', async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findById(id);
        if (existingUser) {
            const list = new List({ title, body, user: existingUser });
            await list.save().then(() => res.status(200).json({ list }));
            existingUser.list.push(list);
            existingUser.save();
        }
        else {
            res.status(400).json({ message: "User not exist" })

        }
    } catch (error) {
        console.log(error)
    }
})


// Task update
router.put("/updateTask/:id", async (req, res) => {
    try {
        const {user_Id ,task_Id,title,body} = req.body.data

        const existingUser = await User.findByIdAndUpdate(user_Id);        

        if (existingUser) {
            const list = await List.findByIdAndUpdate(task_Id, { title, body });
            list.save().then(() => res.status(200).json({ message: "Task updated" }))
        } else {
            res.status(404).json({ message: "user dont exist" })
        }

    } catch (error) {
        console.log(error)
    }
})


// Delete Task 
router.delete('/deleteTask/:id', async (req, res) => {
    try {
        const { id } = req.body;
        const existingUser = await User.findByIdAndUpdate(
            id, 
            { $pull: { list: req.params.id } }
        )

        if (existingUser) {
            await List.findByIdAndDelete(req.params.id).then(() => {
                res.status(200).json({ message: "Task deleted" })
                console.log("Task Deleted");
                
            });
        }
        else {
            res.status(404).json({ message: `User not in data`})
            console.log("user not found");
            
        }

    } catch (error) {
        console.log(error);
    }
});

// get Task

router.get('/getTasks/:id', async (req,res)=>{
    const list = await List.find({user : req.params.id}).sort({createdAt:-1});
    if(list.length !== 0){
        res.status(200).json({list:list})
    }else{
        res.status(200).json({message: "No Task yet..."})

    }
})

module.exports = router;

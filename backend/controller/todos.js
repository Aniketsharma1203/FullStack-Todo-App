import User from "../models/login.js";

export const addTodoRow = async (req, res) => {

    const { id, task, status } = req.body.data;
    try {
        await User.findByIdAndUpdate(
            req.body.uid,
            { $push: { todo: { id, task, status } } },
        );
    } catch (error) {
        console.log("Error Row is not updating", error);
        return res.status(500).send("Error Row is not updating");
    }
};

export const updateRow = async (req, res) => {
    const { id, task, status } = req.body.data;

    try {
        await User.updateOne(
            { _id: req.body.uid, "todo.id": id },
            { $set: { "todo.$": req.body.data } }
        );
        console.log("Data Saved Successfully.");
    } catch (error) {
        console.error("Error updating todo:", error);
    }
};

export const getData = async (req, res) => {
    try {
        const todos = await User.findOne({ _id: req.query.uid });
        if (todos) {
            res.send(todos);
        } else {
            res.status(404).json({ message: "No todos found for this user" });
        }
    } catch (error) {
        console.log(error);
    }
};

export const deleteData = async (req, res) => {
    console.log(req.body.data);
    try {
        await User.updateOne(
            { _id: req.body.uid },
            { $pull: { todo: { id: req.body.data } } }
        );
        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getCompletedTasks = async(req, res) => {

    try {
        const data = await User.findOne({ _id: req.query.uid.key });
        const todos = data.todo;
        const completedTodo = todos.filter((todo) => todo.status === "Done");
        if (todos) {
            res.send(completedTodo);
        } 
        else {
            res.status(404).json({ message: "No Completedtodos found for this user" });
        }
    } catch (error) {
        console.log(error);
    }
};
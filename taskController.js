const taskModel = require("../models/taskModel");

const getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.getTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await taskModel.getTasksById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createTask = async (req, res) => {
    try {
        const newTask = await taskModel.createTask(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const updatedTask = await taskModel.updateTask(req.params.id, req.body);
        if (!updatedTask) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const deletedTask = await taskModel.deleteTask(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }
        res.json(deletedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const { Pool } = require('pg');


module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};

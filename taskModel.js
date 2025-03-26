const pg = require("../config/db");

const getTasks = async () => {
    try {
        const res = await pg.query("SELECT * FROM tareas");
        return res.rows;
    } catch (error) {
        throw error;
    }
};

const getTasksById = async (id) => {
    try {
        const res = await pg.query("SELECT * FROM tareas WHERE id = $1", [id]);
        return res.rows[0];
    } catch (error) {
        throw error;
    }
};

const createTask = async (task) => {
    const { title, descripcion } = task;
    try {
        const res = await pg.query(
            "INSERT INTO tareas (title, descripcion) VALUES ($1, $2) RETURNING *",
            [title, descripcion]
        );
        return res.rows[0];
    } catch (error) {
        throw error;
    }
};

const updateTask = async (id, task) => {
    const { title, descripcion } = task;
    try {
        const res = await pg.query(
            "UPDATE tareas SET title = $1, descripcion = $2 WHERE id = $3 RETURNING *",
            [title, descripcion, id]
        );
        return res.rows[0];
    } catch (error) {
        throw error;
    }
};

const deleteTask = async (id) => {
    try {
        const res = await pg.query(
            "DELETE FROM tareas WHERE id = $1 RETURNING *",
            [id]
        );
        return res.rows[0];
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getTasks,        
    getTasksById,
    createTask,
    updateTask,
    deleteTask,
};

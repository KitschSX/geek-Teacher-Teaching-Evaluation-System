const db = require('../config/db');

exports.getAllTeachers = (req, res) => {
    db.query('SELECT * FROM teachers', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.addTeacher = (req, res) => {
    const { name, gender, age } = req.body;
    db.query('INSERT INTO teachers (name, gender, age) VALUES (?, ?, ?)', [name, gender, age], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: '教师添加成功' });
    });
};

exports.updateTeacher = (req, res) => {
    const { name, gender, age } = req.body;
    const { id } = req.params;

    db.query('UPDATE teachers SET name = ?, gender = ?, age = ? WHERE id = ?', [name, gender, age, id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: '教师更新成功' });
    });
};

exports.deleteTeacher = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM teachers WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: '教师删除成功' });
    });
};

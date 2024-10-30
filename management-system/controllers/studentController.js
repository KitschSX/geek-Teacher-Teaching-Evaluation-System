const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.getAllStudents = (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.addStudent = (req, res) => {
    const { name, gender, age, studentId, class: studentClass, username } = req.body;
    const initialPassword = '123456';

    bcrypt.hash(initialPassword, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json(err);

        db.query('INSERT INTO students (name, gender, age, studentId, class) VALUES (?, ?, ?, ?, ?)', [name, gender, age, studentId, studentClass], (err, results) => {
            if (err) return res.status(500).json(err);

            const studentId = results.insertId;
            db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, 'student'], (err) => {
                if (err) {
                    db.query('DELETE FROM students WHERE id = ?', [studentId]); // Rollback if user insertion fails
                    return res.status(500).json(err);
                }
                res.json({ message: '学生添加成功' });
            });
        });
    });
};

exports.updateStudent = (req, res) => {
    const { name, gender, age, studentId, class: studentClass } = req.body;
    const { id } = req.params;

    db.query('UPDATE students SET name = ?, gender = ?, age = ?, studentId = ?, class = ? WHERE id = ?', [name, gender, age, studentId, studentClass, id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: '学生更新成功' });
    });
};

exports.deleteStudent = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM students WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json(err);

        db.query('DELETE FROM users WHERE role = "student" AND username = (SELECT username FROM users WHERE id = ?)', [id], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: '学生删除成功' });
        });
    });
};

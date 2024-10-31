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
    const { name, gender, age, studentId, class: studentClass, username } = req.body;
    const { id } = req.params;

    let sql = 'UPDATE students SET ';
    const params = [];
    const fieldsToUpdate = [];

    // 动态添加要更新的字段
    if (name) {
        fieldsToUpdate.push('name = ?');
        params.push(name);
    }
    if (gender) {
        fieldsToUpdate.push('gender = ?');
        params.push(gender);
    }
    if (age) {
        fieldsToUpdate.push('age = ?');
        params.push(age);
    }
    if (studentId) {
        fieldsToUpdate.push('studentId = ?');
        params.push(studentId);
    }
    if (studentClass) {
        fieldsToUpdate.push('class = ?');
        params.push(studentClass);
    }
    if (username) {
        fieldsToUpdate.push('username = ?');
        params.push(username);
    }

    // 如果没有提供要更新的字段，返回错误
    if (fieldsToUpdate.length === 0 && !username) {
        return res.status(400).json({ message: '没有提供要更新的字段' });
    }

    // 拼接 SQL 语句
    sql += fieldsToUpdate.join(', ');
    sql += ' WHERE id = ?';
    params.push(id);

    // 更新 students 表
    db.query(sql, params, (err) => {
        if (err) return res.status(500).json(err);

        if (username) {
            // 更新 users 表中的 username
            const sqlUsers = 'UPDATE users SET username = ? WHERE id = ?';
            db.query(sqlUsers, [username, id], (err) => {
                if (err) return res.status(500).json(err);
                res.json({ message: '学生和用户信息更新成功' });
            });
        } else {
            res.json({ message: '学生更新成功' });
        }
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

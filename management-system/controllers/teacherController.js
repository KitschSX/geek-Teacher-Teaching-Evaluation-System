const db = require('../config/db');

exports.getAllTeachers = (req, res) => {
    db.query('SELECT * FROM teachers', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.addTeacher = (req, res) => {
    const { name, gender, age, classes} = req.body;
    db.query('INSERT INTO teachers (name, gender, age,classes) VALUES (?, ?, ?,?)', [name, gender, age,classes], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: '教师添加成功' });
    });
};

exports.updateTeacher = (req, res) => {
    const { name, gender, age, username, classes } = req.body;
    const { id } = req.params;

    let sql = 'UPDATE teachers SET ';
    const params = [];
    let fieldsToUpdate = [];

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
    if (classes) {
        fieldsToUpdate.push('classes = ?');
        params.push(classes);
    }

    // 如果没有提供要更新的字段，返回错误
    if (fieldsToUpdate.length === 0 && !username) {
        return res.status(400).json({ message: '没有提供要更新的字段' });
    }

    // 拼接 SQL 语句
    sql += fieldsToUpdate.join(', ');
    sql += ' WHERE id = ?';
    params.push(id);

    // 更新 teachers 表
    db.query(sql, params, (err) => {
        if (err) return res.status(500).json(err);

        if (username) {
            // 更新 users 表中的 username
            const sqlUsers = 'UPDATE users SET username = ? WHERE id = ?';
            db.query(sqlUsers, [username, id], (err) => {
                if (err) return res.status(500).json(err);
                res.json({ message: '教师和用户信息更新成功' });
            });
        } else {
            res.json({ message: '教师更新成功' });
        }
    });
};

exports.deleteTeacher = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM teachers WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: '教师删除成功' });
    });
};

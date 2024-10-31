const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.getAllAdmins = (req, res) => {
    const query = `
        SELECT a.name, a.gender, a.age, u.username, a.id
        FROM admins a
        JOIN users u ON a.username = u.username;
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);

        const data = {
            tableHeader: {'姓名': 'name', '性别': 'gender', '年龄': 'age', '用户名': 'username'},
            data: results.map(admin => ({
                name: admin.name,
                gender: admin.gender,
                age: admin.age,
                username: admin.username,
                id: admin.id,
            })),
        };

        res.json(data);
    });
};

exports.addAdmin = (req, res) => {
    const {name, gender, age, username} = req.body;
    const initialPassword = '123456';

    bcrypt.hash(initialPassword, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json(err);
        db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, 'admin'], (err, results) => {

            if (err) return res.status(500).json(err);

            const adminId = results.insertId;
            db.query('INSERT INTO admins (id, name, gender, age, username) VALUES (?, ?, ?, ?, ?)', [adminId, name, gender, age, username], (err) => {

                if (err) {
                    db.query('DELETE FROM admins WHERE id = ?', [adminId]); // Rollback if user insertion fails
                    return res.status(500).json(err);
                }
                res.json({message: '管理员添加成功'});
            });
        });
    });
};
exports.changePassword = (req, res) => {
    const userId = req.user.id; // 从 `authenticate` 中间件解析出的用户 ID
    const { oldPwd, newPwd } = req.body;

    // 检查旧密码是否正确
    db.query('SELECT password FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ code: 500, msg: '数据库查询失败' });
        }
        if (results.length === 0) {
            return res.status(404).json({ code: 404, msg: '用户不存在' });
        }

        const hashedPassword = results[0].password;

        // 比较旧密码是否匹配
        bcrypt.compare(oldPwd, hashedPassword, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ code: 500, msg: '密码匹配失败' });
            }
            if (!isMatch) {
                return res.status(401).json({ code: 401, msg: '旧密码不正确' });
            }

            // 旧密码正确，更新新密码
            bcrypt.hash(newPwd, 10, (err, newHashedPassword) => {
                if (err) {
                    return res.status(500).json({ code: 500, msg: '密码加密失败' });
                }

                db.query('UPDATE users SET password = ? WHERE id = ?', [newHashedPassword, userId], (err) => {
                    if (err) {
                        return res.status(500).json({ code: 500, msg: '数据库更新失败' });
                    }

                    res.status(200).json({ code: 200, msg: '密码修改成功' });
                });
            });
        });
    });
};
exports.updateAdmin = (req, res) => {
    const {name, gender, age, username} = req.body;
    const {id} = req.params;

    let sql = 'UPDATE admins SET ';
    let sqlUsers = 'UPDATE users SET username = ?';
    const params = [];

    if (name) {
        sql += 'name = ?';
        params.push(name);
    } else if (gender) {
        sql += 'gender = ?';
        params.push(gender);
    } else if (age) {
        sql += 'age = ?';
        params.push(age);
    } else if (username) {
        sql += 'username = ?';
        params.push(username);
    } else {
        return res.status(400).json({message: '没有提供要更新的字段'});
    }

// 添加 id 到参数中
    sql += ' WHERE id = ?';
    params.push(id);

    db.query(sql, params, (err) => {
        if (err) return res.status(500).json(err);

        if (username) {
            db.query(sqlUsers + ' WHERE id = ?', [username, id], (err) => { // 更新 users 表
                if (err) return res.status(500).json(err);
                res.json({message: '管理员和用户信息更新成功'});
            });
        } else {

            res.json({message: '管理员更新成功'});
        }
    });
};

exports.deleteAdmin = (req, res) => {
    const {id} = req.params;

    db.query('DELETE FROM users WHERE role = "admin" AND username = (SELECT username FROM admins WHERE id = ?)', [id], (err) => {
        if (err) return res.status(500).json(err);

        db.query('DELETE FROM admins WHERE id = ?', [id], (err) => {
            if (err) return res.status(500).json(err);
            res.json({message: '管理员删除成功'});
        });
    });
};

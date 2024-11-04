const db = require('../config/db');

exports.getAllMetrics = (req, res) => {
    db.query('SELECT * FROM evaluation_metrics ORDER BY order_num', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.addMetric = (req, res) => {
    const { name, title, options } = req.body;
    const orderNum = 10; // 设置默认顺序
    db.query('INSERT INTO evaluation_metrics (name, title, options, order_num) VALUES (?, ?, ?, ?)', [name, title, JSON.stringify(options), orderNum], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: '评价指标添加成功' });
    });
};

exports.updateMetric = (req, res) => {
    const { id } = req.params;
    const { name, title, options, order_num } = req.body;
    db.query('UPDATE evaluation_metrics SET name = ?, title = ?, options = ?, order_num = ? WHERE id = ?', [name, title, JSON.stringify(options), order_num, id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: '评价指标更新成功' });
    });
};

exports.deleteMetric = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM evaluation_metrics WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: '评价指标删除成功' });
    });
};

exports.submitResult = (req, res) => {
    const { teacherId, formData, evaluations } = req.body;
    db.query('INSERT INTO evaluation_results (teacherId, results,evaluations) VALUES (?, ?,?)', [teacherId, JSON.stringify(formData),JSON.stringify(evaluations)], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: '评价结果提交成功' });
    });
};

exports.getAllResults = (req, res) => {
    db.query('SELECT * FROM evaluation_results', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.updateResult = (req, res) => {
    const { id } = req.params;
    const { formData } = req.body;
    db.query('UPDATE evaluation_results SET results = ? WHERE id = ?', [JSON.stringify(formData), id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: '评价结果更新成功' });
    });
};

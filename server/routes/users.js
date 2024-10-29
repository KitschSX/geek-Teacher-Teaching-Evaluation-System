var express = require('express');
var router = express.Router();
 
var userDao = require('../dao/userDao');
 
/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('updateUser');
});
 
// 增加用户
//TODO 同时支持get,post
router.get('/addUser', function(req, res, next) {
	userDao.add(req, res, next);
});
 
router.get('/queryAll', function(req, res, next) {
	userDao.queryAll(req, res, next);
});
 
router.get('/query', function(req, res, next) {
	userDao.queryById(req, res, next);
});
 
router.get('/deleteUser', function(req, res, next) {
	userDao.delete(req, res, next);
});
 
router.post('/updateUser', function(req, res, next) {
	userDao.update(req, res, next);
});
 
router.post('/login', function(req, res, next) {
	userDao.login(req, res, next);
});

router.get('/teachers',function(req,res,next){
	res.json({
		teachers:[{name:'王老师', id: '12'},{name:'李老师', id: '13'}],
		code: '200'
	});
})
router.post('/evaluate',function(req,res,next){
	res.json({
		code: '200'
	});
})
router.get('/evaluations',function(req,res,next){
	res.json({
		code: '200',
		evaluations: [{
			method: 'input',
			name: 'input',
			title:'对老师的评价1',
			placeholder:'在这里填写评价内容'
		},{
			method: 'score',
			name: 'score',
			title:'对老师的评价2',
			options:['非常满意','满意','不满意']
		},{
			method: 'radio',
			name: 'radio',
			title:'对老师的评价3',
			options:['非常满意','满意','不满意']
		}, {
			method: 'checkbox',
			name: 'checkbox',
			title:'对老师的评价4',
			options:['非常满意','满意','不满意']
		}, {
			method: 'select',
			name: 'select',
			title:'对老师的评价5',
			options:['非常满意','满意','不满意']
		}]
	});
})
module.exports = router;
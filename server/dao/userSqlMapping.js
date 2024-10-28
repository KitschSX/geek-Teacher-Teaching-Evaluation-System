// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
	insert:'insert into user(id, name, pwd, role) values(0,?,?,?);',
	update:'update user set name=?, pwd=?, role=? where id=?;',
	delete: 'delete from user where id=?;',
	queryById: 'select * from user where id=?;',
	queryAll: 'select * from user;',
	login: 'select role from user where name=? and pwd=?;'	
};
 
module.exports = user;
let db = require('../index');
let helper = require('../helper');

/**
 * Insert User entity into the database
 * 
 * @param {Object} data User data 
 */
const insertUser = (data) => {
	const {id, email, name, serverAuthCode, accessToken, photo, calendarID, refreshToken} = data;

	return new Promise((resolve, reject) => {
		db.run('INSERT INTO USER(ID, EMAIL, FULLNAME, SERVERAUTHCODE, ACCESSTOKEN, PHOTOURL,REFRESHTOKEN) VALUES(?,?,?,?,?,?,?)', [id , email, name, serverAuthCode, accessToken, photo, refreshToken], (err) => {
			if (err) reject(err);
			resolve(id);
		});
	});
}

/**
 * Update User entity in the database
 * 
 * @param {Array} columns array of strings that represent columns to be updated 
 * @param {Array} values aray of values corresponding to columns to be updated 
 */
const updateUser = (columns,values) => {
	const set = helper.arrayToQuerySETString(columns);	

	return new Promise( async (resolve, reject) => {
		db.run( `UPDATE User SET ${set} WHERE ID = ?`, values, function(err) {
			if (err) reject(err);
			resolve();
			// console.log(`Row(s) updated: ${this.changes}`);
		  });
	});
}

/**
 * Update User entity in the database
 * 
 * @param {Array} columns array of strings that represent columns to be updated 
 * @param {Array} values aray of values corresponding to columns to be updated 
 */
const getUserInfo = (columns, id) => {
	const select = helper.arrayToQuerySELECTString(columns);

	return new Promise( async (resolve, reject) => {
		db.get( `SELECT ${select} FROM User WHERE ID = ?`, [id], function(err, row) {
			if (err) reject(err);
			resolve(row);
			console.log(`Row(s) updated: ${this.changes}`);
		  });
	});
}

/**
 * Delete User entity from the database
 * 
 * @param {String} id ID of the user
 */
const deleteUser = (id) => {
	return new Promise( async (resolve, reject) => {

	});
}

/**
 * Get User entity from the database
 * 
 * @param {String} id ID of the user
 */
const getUser = (id) => {
	return new Promise( (resolve, reject) => {
		db.get(`SELECT * FROM User WHERE ID = ?`,[id], (err, row ) => {
			if(err) reject(err);
			resolve(row);
		});
	});
}


/**
 * Get User entity from the database
 * 
 * @param {String} column by the specified column
 */
const getSpecificUserInfo = (columns, where) => {
	const select = helper.arrayToQuerySELECTString(columns);

	return new Promise( (resolve, reject) => {
		db.get(`SELECT ${select} FROM User WHERE ${where.field} = ?`,[where.value], (err, row ) => {
			if(err) reject(err);
			resolve(row);
		});
	});
}

/**
 * Get all Users stored in the database
 * 
 */
const getUsers = () => {
	return new Promise( (resolve, reject) => {
		db.all(`SELECT * FROM User`, (err, rows ) => {
			if(err) reject(err);
			resolve(rows);
		});
	});
}


module.exports = {	
	insertUser,
	getUser,
	updateUser,
	getUsers,
	getUserInfo,
	getSpecificUserInfo
};
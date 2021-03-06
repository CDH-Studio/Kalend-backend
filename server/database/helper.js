const arrayToQuerySETString = (columns) => {
	let SET  = '';
	columns.forEach((column,idx) => {
		if (idx == columns.length -1){
			SET += `${column} = ?`;
			return;
		} 

		SET += `${column} = ?,`
	});
	
	return SET;
}

const arrayToQuerySELECTString = (columns) => {
	let SET = '';
	columns.forEach((column, idx) => {
		if (idx == columns.length -1){
			SET += `${column}`;
			return;
		} 

		SET += `${column},`
	});
	return SET;
}


module.exports = {	
	arrayToQuerySETString,
	arrayToQuerySELECTString
};
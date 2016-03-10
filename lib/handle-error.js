module.exports = exports = {
	handleError: function(err, res) {
		console.log(err);
		return res.status(500).json({
			msg: 'There was an error'
		});
	}
};	
module.exports = {
	devServer: {
		proxy: {
			"http://localhost:1337/"
		}
	    headers: {
			"Access-Control-Allow-Origin": "*"
	    }
	}
}

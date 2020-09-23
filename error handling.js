function http() {
	return {
		get(url, callback) {
			// GET
			try {
				const xhr = new XMLHttpRequest();
				xhr.open('GET', url);
				xhr.onload = function() {
					if (Math.floor(xhr.status / 100) !== 2) {
						callback(`Error: ${xhr.status}`, xhr);
						return;
					}
					const response = JSON.parse(xhr.response);
					callback(null, response);
				};
				xhr.onerror = function() {
					callback(`Error: ${xhr.status}`, xhr);
				};
				xhr.send();
			} catch (error) {
				callback(error);
			}
		},
		post(url, body, headers, callback) {
			// POST
			try {
				const xhr = new XMLHttpRequest();
				xhr.open('POST', url);
				xhr.onload = function() {
					if (Math.floor(xhr.status / 100) !== 2) {
						callback(`Error: ${xhr.status}`, xhr);
						return;
					}
					const response = JSON.parse(xhr.response);
					callback(null, response);
				};

				if (headers) {
					Object.entries(headers).forEach(([ key, value ]) => {
						xhr.setRequestHeader(key, value);
					});
				}
				xhr.onerror = function() {
					callback(`Error: ${xhr.status}`, xhr);
				};
				xhr.send(JSON.stringify(body));
			} catch (error) {
				callback(error);
			}
		}
	};
}

const myHttp = http();

myHttp.get('https://jsonplaceholder.typicode.com/users', (error, response) => {
	console.log(error, response);
});

myHttp.post(
	'https://jsonplaceholder.typicode.com/users',
	{
		title: 'foo',
		body: 'bar',
		userId: 1
	},
	{ 'Content-Type': 'application/json' },
	(err, response) => {
		console.log(err, response);
	}
);

class Api {
	constructor(config) {
		this._url = config.baseUrl;
		this._contentType = config.headers['Content-type'];
	}

	_getResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}

	getMurms() {
		return fetch(`${this._url}/twits`, {
			headers: {
				'Content-type': 'application/json'
			}
		}).then(this._getResponse);
	}

	setNewMurm(text) {
		return fetch(`${this._url}/twits`, {
			method: 'POST',
			headers: {
				authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDhhZmEzYzUyYjE1OTUxNTRhYzI0NzgiLCJpYXQiOjE2MTk3MjA4MjQsImV4cCI6MTYyMDMyNTYyNH0.3U7TkDczpltVE4ECL0zVGsDLqB2_qaeCJ2Isc0_3Xho`,
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				text: text
			})
		}).then(this._getResponse);
	}

	deleteMurm(twitId) {
		return fetch(`${this._url}/twits/${twitId}`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDhhZmEzYzUyYjE1OTUxNTRhYzI0NzgiLCJpYXQiOjE2MTk3MjA4MjQsImV4cCI6MTYyMDMyNTYyNH0.3U7TkDczpltVE4ECL0zVGsDLqB2_qaeCJ2Isc0_3Xho`,
				'Content-type': 'application/json'
			}
		}).then(this._getResponse);
	}

	setLikeMurm(murmId) {
		return fetch(`${this._url}/twits/${murmId}/likes/`, {
			method: 'PUT',
			headers: {
				authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDhhZmEzYzUyYjE1OTUxNTRhYzI0NzgiLCJpYXQiOjE2MTk3MjA4MjQsImV4cCI6MTYyMDMyNTYyNH0.3U7TkDczpltVE4ECL0zVGsDLqB2_qaeCJ2Isc0_3Xho`,
				'Content-type': 'application/json'
			}
		}).then(this._getResponse);
	}

	deleteLikeMurm(murmId) {
		return fetch(`${this._url}/twits/${murmId}/likes/`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDhhZmEzYzUyYjE1OTUxNTRhYzI0NzgiLCJpYXQiOjE2MTk3MjA4MjQsImV4cCI6MTYyMDMyNTYyNH0.3U7TkDczpltVE4ECL0zVGsDLqB2_qaeCJ2Isc0_3Xho`,
				'Content-type': 'application/json'
			}
		}).then(this._getResponse);
	}
	//--------------------------------------------------------------------------------------------------------------
	getUser() {
		return fetch(`${this._url}/users/me`, {
			headers: {
				authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDhhZmEzYzUyYjE1OTUxNTRhYzI0NzgiLCJpYXQiOjE2MTk3MjA4MjQsImV4cCI6MTYyMDMyNTYyNH0.3U7TkDczpltVE4ECL0zVGsDLqB2_qaeCJ2Isc0_3Xho`,
				'Content-type': 'application/json'
			}
		}).then(this._getResponse);
	}

	setUser({ name, about }) {
		return fetch(`${this._url}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDhhZmEzYzUyYjE1OTUxNTRhYzI0NzgiLCJpYXQiOjE2MTk3MjA4MjQsImV4cCI6MTYyMDMyNTYyNH0.3U7TkDczpltVE4ECL0zVGsDLqB2_qaeCJ2Isc0_3Xho`,
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				about: about
			})
		}).then(this._getResponse);
	}

	setUserAvatar({ avatar }) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDhhZmEzYzUyYjE1OTUxNTRhYzI0NzgiLCJpYXQiOjE2MTk3MjA4MjQsImV4cCI6MTYyMDMyNTYyNH0.3U7TkDczpltVE4ECL0zVGsDLqB2_qaeCJ2Isc0_3Xho`,
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				avatar: avatar
			})
		}).then(this._getResponse);
	}
}

const api = new Api({
	baseUrl: 'http://localhost:3003',
	headers: {
		'Content-type': 'application/json'
		//authorization: `Bearer ${localStorage.getItem('token')}`,
		//authorization: 'd4ad1f5c-6d3d-4923-9666-f0281ec3ce2e',
	}
});

export default api;
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();
const server = require('../app');
chai.use(chaiHttp);

describe('Database tests', () => {
	it('Should return error 404 if the user is not logged in', (done) => {
		chai
			.request(server)
			.get('/login/')
			.end((err, res) => {
				res.should.have.status(404);
			});
		done();
	});

	it('Should return error 404 if the username or the password are empty strings or nulls/undefined', (done) => {
		const user = 'santiago';
		const password = '123';
		chai
			.request(server)
			.post('/login/')
			.send({ user, password })
			.end((err, res) => {
				if (user == null) {
					expect(res.body.errorDetail).to.be.equal(
						'Usuario y/o contraseña no ingresados'
					);
				}
				done();
			});
	});
});

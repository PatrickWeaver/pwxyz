var should = require('should'),
	request = require('supertest'),
	app = require('../app.js'),
	mongoose = require('mongoose'),
	Project = mongoose.model('Project'),
	agent = request.agent(app);

describe('Project Crud Test', function(){
	it('Should allow a book to be posted and return an _id', function(done){
		var projectPost = {name: 'new project', medium: 'new medium', url: 'http://url.com'};

		agent.post('/api/projects')
			.send(projectPost)
			.expect(200)
			.end(function(err, results){
				results.body.should.have.property('_id');
				done();
			})
	})

	afterEach(function(done){
		Project.remove().exec();
		done();
	})
})
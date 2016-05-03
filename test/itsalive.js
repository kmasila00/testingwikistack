var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

describe('testing suite', function(){
	it('confirms basic math', function(){
		expect(2+2).to.equal(4);
	});
});

describe('check timeout', function(){
	it('checking', function(done){
		var start = new Date();
		setTimeout( function (){
			var duration  = new Date()- start;
			expect(duration).to.be.closeTo(1000,50);
			done();
		}, 1000);
	});
});


describe('spying', function(){

	it('is it spying on stuff?', function(){
		var a = [1,2,3,4,5];

		function addTwo(num){
			return num + 2;
		}

		var addTwo = chai.spy(addTwo);

		a.forEach(addTwo);
		expect(addTwo).to.have.been.called.exactly(a.length);
	});
});



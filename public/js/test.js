/*

var test = function() {
	console.log("2");
}



var pTest = test()
pTest.then(function(test){
	console.log("3")
})

*/

var sayHello = new Promise(function(resolve, reject) {
	resolve("YES");
})


sayHello.then(function(value) {
	console.log("NO");
	console.log(value);
})

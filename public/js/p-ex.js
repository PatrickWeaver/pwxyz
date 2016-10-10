var someAsyncThing = function() {
	console.log("⚙ sAT()");
  return new Promise(function(resolve, reject) {
    // this will throw, x does not exist
    console.log("During!");
    resolve();
  });
};


console.log("This is before");

someAsyncThing().then(function() {
  console.log('End: success');
  y = 100001;
}).catch(function(error) {
  console.log("End: failure");
});

while (y < 100000){
	console.log("This is after (before response)" + y);
	y+=1;
}
// const p1 = new Promise((resolve) => {
//     setTimeout(resolve("rishabh"),2000);
// }).then((response)=>(console.log(response)))
// .catch((error)=>{error:error.message})
// console.log(p1)

const p1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve("rishabh");
    }, 2000);
});

p1.then((response) => {
    console.log(response);
});



// common things that return Promises

// fetch(url) ; Browser APIs
//
// Mongoose:-
// mongoose.connect();
// mongoose.create();
// mongoose.find();
// mongoose.findById();
// mongoose.deleteOne();

// Timers (wrapped manually )
// like the above one ^

// File system (Node.js)
//fs.promises.readFile()


// async also return promise
// await  pause for promise to actually finish.


// simple practice 1:
const promise = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Pizza delivered!");
    }, 3000);
});

console.log("Order placed");

promise.then((message) => {
    console.log(message);
});

console.log("Watching TV...");

// output:  order placed -> watching tv -> Pizza delivered!
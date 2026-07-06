// async makes a function capable of performing asynchronous operations
// and automatically returns a Promise.
// e.g.

async function greet() {
  return "Hello";
}
// actually returns : Promise{"Hello"}
// So:
greet().then(console.log);

// prints: Hello


// why? It is needed because
// some tasks take time:
// * reading files,
// * calling APIs,
// * connecting to databases
// * waiting for user input
//
// if javascript waited for these operations
// synchronously, then entire program would freeze.
// e.g.
try{   // this code might throw error

  const user = fetchUser();
  console.log(user);


}catch(error){ // if error actuall happen, handle it here in catch block 
// catch gracefully handle that exception and entire program still runs...
  console.log({error:error.message})
}

// fetching data may take 2 seconds. JS doesn't want to 
// stop everything during those 2 seconds.
// therefore such operations returns a Promise.

//------------------------
// what is Promise?

// Promise is an object represent the future outcome of an asynchronous operation.

// state: promise can have 3 states
//         * pending ; 
//  either * resolved ; 
//    or   * rejected ;


// syntactially : asynchronous opertion .then().catch() ;
// or   async/await inside try and catch block 

// we can create a custom promise using new keyword


//------------------------
// what is await?

// await means: "Pause this async function until the Promise finishes."

// e.g.
async function getData(){
  const response = await fetch(url);
  console.log(response);
}
// without await, we'll get:

// Promise {<pending>}
// with await , we get the actual result after the Promise resolves.

// analogy : real-world
// we order food, in restaurant
// Without "await" -->
// we place order and immediately ask: "where's my food?"

// Restaurant: "we're still cooking!"
// the answer we get is a "pending promise."

// With "await" -->
// we order food and patiently wait.

// when the food is ready, we receive it and continue eating.
import asmPromise from "../assembly/moduleEntry.ts";
asmPromise().then(function(asmModule){
  // here you can use the wasm.exports
//   asmModule.step();
  let result = asmModule.fbnq(30);
  console.log('result is:', result);

})

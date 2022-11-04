import { useCallback } from "react";

let readwriteStore, readonlyStore;
let createIndexDB = (indexedDB) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('animeDatabase', 1);
    request.onerror = (err) => reject(err);
    request.onupgradeneeded = () => {
      const db = request.result;
      const store = db.createObjectStore('anime', { keyPath: "id" })
      store.createIndex("nameDB", ["animeName"], { unique: false });
    }
    request.onsuccess = () => {
      console.info("successfully open db")
      resolve(request.result);
    }
  })
}


let option = db => (method, arg, callback) => {
  const transaction = db.transaction("anime", method);
  let store = transaction.objectStore("anime")
  return callback(arg, store)
}



let modeOption = (option2func) => {
  let getAlldb = (arg) => option2func("readonly", arg, (arg, store) => store.getAll())
  let dataViewdb = (arg) => option2func("readonly", arg, (arg, store) => store.getKey(arg))
  let dataDeletedb = (arg) => option2func("readwrite", arg, (arg, store) => { store.delete(arg) })
  let dataPutdb = (arg) => option2func("readwrite", arg, (arg, store) => { store.put(arg) })
  return ({ dataViewdb, dataDeletedb, dataPutdb, getAlldb })


}
let pipe = (...func) => (input) => func.reduce((pro, fun) =>
  pro.then(fun), Promise.resolve(input)
)


const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;
let globalstore = indexedDB == null ?
  console.log("broswer didnt support")
  :
  pipe(
    createIndexDB,
    option,
    modeOption
  )(indexedDB)

export default () => {
  return globalstore
} 

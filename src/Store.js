import { writable } from "svelte/store";

const DB = {
    data: {
        Fitness: {},
        Work: {
        }
    },
    activeBoard: 'Fitness'
}


const localStorageDB = localStorage.getItem('DB')
const DB_TO_USE = localStorageDB ? JSON.parse(localStorageDB) : DB
const store = writable(DB_TO_USE, () => {
    const unSub = store.subscribe(value => {
        localStorage.setItem('DB', JSON.stringify(value))
    })
    return unSub
})

export default store
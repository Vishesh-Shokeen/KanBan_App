import { writable } from "svelte/store";

const DB = {
    "data": {
        "PLATFORM LAUNCH": {
            "TODO": {
                "Build UI for onboarding flow": {
                    "desc": "Lorem ipsum",
                    "subtask": {
                        "Subtask 01": false,
                        "Subtask 02": false
                    },
                    'subTaskDone': 0,
                    'totalSubtask': 2,
                    "column": "TODO",
                    "taskName": "Build UI for onboarding flow",
                    "color": "lightgreen"
                },
                "Build UI for search": {
                    "desc": "lorem ipsum dolor isit",
                    "subtask": {
                        "Subtask -- 1": false
                    },
                    'subTaskDone': 0,
                    'totalSubtask': 1,
                    "column": "TODO",
                    "taskName": "Build UI for search",
                    "color": "lightpink"
                },
                "Build UI for settings": {
                    "desc": "lorem ipsum dolor isit",
                    "subtask": {},
                    'subTaskDone': 0,
                    'totalSubtask': 0,
                    "column": "TODO",
                    "taskName": "Build UI for settings",
                    "color": ""
                }
            },
            "DOING": {
                "Design setting and search page": {
                    "desc": "lorem ipsum dolor isit",
                    "subtask": {},
                    'subTaskDone': 0,
                    'totalSubtask': 0,
                    "column": "DOING",
                    "taskName": "Design setting and search page",
                    "color": "orange"
                },
                "Add Search endpoints": {
                    "desc": "lorem ipsum dolor isit",
                    "subtask": {},
                    'subTaskDone': 0,
                    'totalSubtask': 0,
                    "column": "DOING",
                    "taskName": "Add Search endpoints",
                    "color": "goldenrod"
                },
                "Design onboarding flow": {
                    "desc": "lorem ipsum dolor isit lorem ipsum dolor isit",
                    "subtask": {},
                    'subTaskDone': 0,
                    'totalSubtask': 0,
                    "column": "DOING",
                    "taskName": "Design onboarding flow",
                    "color": "teal"
                }
            },
            "DONE": {
                "Conduct 5 Wireframe tests": {
                    "desc": "lorem ipsum dolor isit lorem ipsum dolor isit lorem ipsum dolor isit lorem ipsum dolor isit",
                    "subtask": {
                        "Subtask 001": false,
                        "lorem ipsum dolor isit": false
                    },
                    'subTaskDone': 0,
                    'totalSubtask': 2,
                    "column": "DONE",
                    "taskName": "Conduct 5 Wireframe tests",
                    "color": "gray"
                },
                "Market Discovery": {
                    "desc": "lorem ipsum dolor isitlorem ipsum dolor isitlorem ipsum dolor isit",
                    "subtask": {
                        "lorem ipsum dolor isit": false
                    },
                    'subTaskDone': 0,
                    'totalSubtask': 1,
                    "column": "DONE",
                    "taskName": "Market Discovery",
                    "color": ""
                }
            }
        },
        "ROADMAP": {}
    },
    "activeBoard": "PLATFORM LAUNCH"
}

const localStorageDB = localStorage.getItem('DB')
if (!localStorageDB) {
    localStorage.setItem('DB', JSON.stringify(DB))
    DB.activeBoard = Object.keys(DB['data'])[0]
}
const DB_TO_USE = localStorageDB ? JSON.parse(localStorageDB) : DB
const store = writable(DB_TO_USE, () => {
    const unSub = store.subscribe(value => {
        localStorage.setItem('DB', JSON.stringify(value))
    })
    return unSub
})

export default store

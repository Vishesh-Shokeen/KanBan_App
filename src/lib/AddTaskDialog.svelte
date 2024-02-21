<script>
    import store from '../Store';
    import bin from "/delete.svg";
    import close from "/close.svg";

    let dialog
    let column


    $: activeBoard = $store.activeBoard
    $: boardColumns = Object.keys($store.data[activeBoard])

    let info = {
        desc: '',
        taskName: '',
        subtaskInputs: ['']
    }

    const incrementSubtaskFn = () => {
        info.subtaskInputs = [...info.subtaskInputs, '']
    }

    const removeSubtaskFn = (e) => {
        const index = Number(e.target.id)
        info.subtaskInputs.splice(index, 1)
        info.subtaskInputs = info.subtaskInputs
    }

    const addNewTaskFn = () => {

        const values = Object.values(info.subtaskInputs)
        let subTaskObj = {}

        for (let i = 0; i < values.length; i++) {
            if (values[i] !== '') {
                subTaskObj[values[i]] = false
            } else {
                delete (subTaskObj[values[i]])
            }
        }

        store.update(prev => {
            return {
                ...prev,
                'data': {
                    ...prev['data'],
                    [activeBoard]: {
                        ...prev['data'][activeBoard],
                        [column]: {
                            ...prev['data'][activeBoard][column],
                            [info.taskName]: {
                                taskName: info.taskName,
                                column: column,
                                desc: info.desc,
                                subtask: subTaskObj,
                                color: ''
                            },
                        }
                    }
                }
            }
        })

        info = {
            desc: '',
            taskName: '',
            column: '',
            subtaskInputs: ['']
        }
    }


    const handleKeyFn = (e) => {
        e.key === 'Enter' ? addNewTaskFn() : null
    }
    const closeFn = (e) => {
        e.target === dialog ? dialog.close() : null;
    }

</script>

<dialog bind:this={dialog} id='addTaskDialog' on:click={closeFn} on:keydown={handleKeyFn}>
    <div>
        <div class="dialog_head">
            <span>Task</span>
            <img on:click={()=> dialog.close()} src={close} alt="Close">
        </div>
        <input maxlength="30" bind:value={info.taskName} type="text" />

        <span>Description</span>
        <input maxlength="100" bind:value={info.desc} type="text" />

        <span>Subtask</span>
        {#each info.subtaskInputs as input, index}
        <div class="subtaskWrapper">
            <input placeholder={`subTask -${index + 1}`} bind:value={info.subtaskInputs[index]} type="text" />
            <img on:click={removeSubtaskFn} id={index} src={bin} alt="Remove Subtask" />
        </div>
        {/each}
        <button on:click={incrementSubtaskFn}>ADD Subtask</button>

        <span>Status</span>
        <!-- set default select    -->
        <select bind:value={column}>
            <option selected value="Column">Column</option>
            {#each boardColumns as option}
            <option value={option}>{option}</option>
            {/each}
        </select>
        <button on:click={addNewTaskFn}>Update</button>
    </div>
</dialog>

<style>
    .dialog_head {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .dialog_head>img {
        width: 1.5rem;

    }

    .subtaskWrapper {
        display: inline-flex;
        align-items: center;
        justify-content: end;
    }

    .subtaskWrapper>input {
        margin: 0;
        width: 100%;
    }

    .subtaskWrapper>img {
        margin: 0 1rem;
        width: 1rem;
    }
</style>
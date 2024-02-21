<script>
    import store from "../Store";
    import bin from "/delete.svg";
    import colorpicker from "/colorpicker.svg";
    export let info;


    $: data = $store.data

    let dialog
    let color = ''

    let updatedColumn;
    $: activeBoard = $store.activeBoard;
    $: subtaskKeys = Object.keys(info.subtask)
    $: subtaskValues = Object.values(info.subtask)
    $: boardColumns = Object.keys(data[activeBoard])

    const closeFn = (e) => {
        e.target === dialog ? dialog.close() : null;
    };

    const removeTaskFn = () => {
        store.update(prev => {
            const newObj = { ...prev.data }
            delete newObj[activeBoard][info.column][info.taskName]
            return {
                ...prev,
                newObj
            }
        })
        dialog.close()
    }
    const updateTaskFn = () => {
        const colorField = document.querySelector('#colorSelectorInput')

        store.update(prev => {
            delete data[activeBoard][info.column][info.taskName]
            return {
                ...prev,
                'data': {
                    ...prev['data'],
                    [activeBoard]: {
                        ...prev['data'][activeBoard],
                        [updatedColumn]: {
                            ...prev['data'][activeBoard][updatedColumn],
                            [info.taskName]: {
                                desc: info.desc,
                                subtask: info.subtask,
                                column: updatedColumn,
                                taskName: info.taskName,
                                color: color
                            }
                        }
                    }
                }

            }
        })

        color = ''
        colorField.style.display = 'none'
        dialog.close()
    };


    const selectColorFn = () => {
        const input = document.querySelector('#colorSelectorInput')
        input.style.display === 'block' ? input.style.display = 'none' : input.style.display = 'block'
    }

    const handleKeyFn = (e) => {
        e.key === "Enter" ? updateTaskFn() : null; selectColorFn
    };



</script>

<dialog class='taskDialog' bind:this={dialog} id="taskInfoDialog" on:keydown={handleKeyFn} on:click={closeFn}>
    <div>
        <div class='dialog_head'>
            <span>{info.taskName}</span>
            <img on:click={selectColorFn} src={colorpicker} alt="Choose Color">
            <img on:click={removeTaskFn} src={bin} alt="Delete" />
        </div>
        <input bind:value={color} id="colorSelectorInput" placeholder="Color- lightgreen" type="text">
        <span>{info.desc}</span>

        <div class="subTaskWrapper">
            {#each subtaskKeys as subTask}
            <label class='subTaskLabel'>
                <input bind:checked={info.subtask[subTask]} name={subTask} type="checkbox" />
                <span>{subTask}</span>
                <div class='subTaskTickBox'></div>
            </label>
            {/each}
        </div>

        <select bind:value={updatedColumn}>
            {#each boardColumns as column}
            <option selected value={column}>{column}</option>
            {/each}
        </select>

        <button on:click={updateTaskFn}>Update</button>
    </div>
</dialog>

<style>
    .dialog_head {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }


    .dialog_head>img {
        width: 1rem;
        cursor: pointer;
    }


    #colorSelectorInput {
        display: none;
    }

    .subTaskWrapper {
        background: var(--black-900);
        color: white;
        border-radius: 10px;
    }

    .subTaskLabel {
        padding: 0.5rem;
        display: flex;
        gap: 1.4rem;
        align-items: center;
    }

    .subTaskLabel>span {
        color: inherit;
    }

    .subTaskTickBox {
        border: 1px dashed;
        padding: 0.4rem;
        border-radius: 50%;

        width: 1rem;
        height: 1rem;

        order: -1;
    }

    .subTaskLabel>input {
        display: none;
    }

    .subTaskLabel>input:checked~.subTaskTickBox {
        background-color: var(--acc);
        border: 1px solid var(--acc);
    }

    .subTaskLabel>input:checked+span {
        text-decoration-line: line-through;
        opacity: .5;
    }
</style>
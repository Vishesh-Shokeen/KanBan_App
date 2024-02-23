<script>
    import Dialog from "./Dialog.svelte";
    import store from "../Store";
    import bin from "/delete.svg";
    import TaskInfoDialog from "./TaskInfoDialog.svelte";
    /*************************/

    let info = {
        desc: "",
        taskName: "",
        column: "",
        subtask: [""],
        color: "",
    };

    $: activeBoard = $store.activeBoard;
    $: boardColumns = Object.keys($store.data[activeBoard]);

    const showDialogFn = () => {
        // @ts-ignore
        document.querySelector("#boardDialog").showModal();
    };

    //fix it
    const deleteColumnFn = (e) => {
        const name = e.target.name;
        store.update((prev) => {
            const newObj = { ...prev.data };
            delete newObj[activeBoard][name];
            return {
                ...prev,
                newObj,
            };
        });
    };

    const updateInfoFn = (task) => {
        info = { ...task };
        // @ts-ignore
        document.querySelector("#taskInfoDialog").showModal();
    };
    //
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<section class="taskBoard">
    {#each boardColumns as column}
        <div class="column">
            <div class="column_head">
                <span>{column}</span>
                <img
                    name={column}
                    on:click={deleteColumnFn}
                    src={bin}
                    alt="Delete Column"
                />
            </div>

            {#each Object.keys($store.data[activeBoard][column]) as task}
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div
                    on:click={() =>
                        updateInfoFn($store.data[activeBoard][column][task])}
                    class="taskWrapper"
                    style={`background-color:${$store.data[activeBoard][column][task].color}`}
                >
                    <span>{task}</span>
                    <p>{$store.data[activeBoard][column][task].desc}</p>
                </div>
            {/each}
        </div>
    {/each}

    <Dialog dialogId="boardDialog" />
    <button class="columnDialogBtn" on:click={showDialogFn}>ADD COLUMN</button>

    <TaskInfoDialog {info} />
</section>

<style>
    span {
        font-weight: var(--fw-600);
        letter-spacing: 2px;
    }

    .taskBoard {
        display: grid;
        grid-auto-flow: column;
        gap: 1rem;
        grid-auto-columns: max(355px, 20%);

        overflow: scroll;
        max-height: 92vh;
        max-height: 92dvh;
    }

    .taskWrapper > span {
        display: block;
        margin-bottom: 1rem;
    }

    .column {
        padding: 0.5rem;
        border-radius: 1rem;
        border: 1px dashed rgba(181, 176, 176, 0.844);
    }

    .column_head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem;
        border: 1px solid rgba(181, 176, 176, 0.244);
        border-radius: 10px;
    }

    .column img {
        cursor: pointer;
        width: 1rem;
    }

    .taskWrapper {
        border: 1px dashed rgba(181, 176, 176, 0.444);
        border-radius: 10px;
        cursor: pointer;
        margin: 1rem 0.5rem;
        padding: 1rem 0.5rem;

        transition: border-color 100ms linear;
        overflow-x: hidden;
    }

    .taskWrapper:hover {
        border-color: var(--acc);
    }
    .taskWrapper:focus {
        outline: none;
    }

    .columnDialogBtn {
        border-radius: 1rem;
        writing-mode: sideways-rl;
        letter-spacing: 5px;
    }
</style>

<script>
    import AddTaskDialog from "./AddTaskDialog.svelte";
    import logo from "/logo.svg";
    import Dots from "/3dots.svg";
    import bin from "/delete.svg";
    import close from "/close.svg";
    import notelist from "/notelist.svg";
    import store from "../Store";

    let editDialog;
    $: activeBoard = $store.activeBoard;
    const showDialogFn = () => {
        document.querySelector("#addTaskDialog").showModal();
    };
    const showEditDialogFn = () => {
        editDialog.showModal();
    };
    const closeDialogFn = () => {
        editDialog.close();
    };

    const deleteCurrentBoard = () => {
        let boardList = Object.keys($store.data);
        if (boardList.length > 1) {
            delete $store.data[activeBoard];
            let nextBoard = Object.keys($store.data)[0];
            $store.activeBoard = nextBoard;
        } else {
            alert("Last Board cannot be deleted");
        }
        editDialog.close();
    };

    const toggleNavFn = () => {
        const nav = document.querySelector("#navBar");
        !nav.getAttribute("showBar")
            ? nav.setAttribute("showBar", true)
            : nav.removeAttribute("showBar");
    };
</script>

<header>
    <img on:click={toggleNavFn} src={notelist} alt="My Boards" />
    <img src={logo} alt="Logo" />

    <div class="editWrapper">
        <button on:click={showDialogFn}>
            +
            <span>Add Task</span>
        </button>

        <img on:click={showEditDialogFn} src={Dots} alt="Edit" />
    </div>

    <AddTaskDialog />
    <dialog bind:this={editDialog} id="editDialog">
        <div>
            <p>
                <span>Delete {activeBoard}</span>
                <span>This action cannot be undone.</span>
            </p>
            <div>
                <img
                    on:click={deleteCurrentBoard}
                    src={bin}
                    alt="Delete Board"
                />
                <img on:click={closeDialogFn} src={close} alt="Close" />
            </div>
        </div>
    </dialog>
</header>

<style>
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    img {
        cursor: pointer;
        width: 2rem;
    }

    .editWrapper {
        display: inline-flex;
    }

    #editDialog div p span {
        display: block;
    }
    #editDialog div > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    @media (width < 700px) {
        button {
            padding: 0.2rem 0.8rem;
        }
        button > span {
            display: none;
        }
    }
</style>

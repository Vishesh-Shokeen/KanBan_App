<script>
    import AddTaskDialog from "./AddTaskDialog.svelte";
    import logo from "/logo.svg";
    import notelist from "/notelist.svg";
    
    const showDialogFn = () => {
        document.querySelector("#addTaskDialog").showModal();
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

    <button on:click={showDialogFn}>
        +
        <span>Add Task</span>
    </button>

    <AddTaskDialog />
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

    @media (width < 700px) {
        button {
            padding: 0.2rem 0.8rem;
        }
        button > span {
            display: none;
        }
    }
</style>

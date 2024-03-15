<script>
    import Dialog from "./Dialog.svelte";
    import sun from "/sun.svg";
    import moon from "/moon.svg";
    import note from "/note.svg";
    import store from "../Store";

    $: boardList = Object.keys($store.data);

    const showDialogFn = () => {
        document.querySelector("#navDialog").showModal();
    };

    const toggleModeFn = () => {
        const appWrapper = document.querySelector("#appWrapper");
        !appWrapper.getAttribute("darkMode")
            ? // @ts-ignore
              appWrapper.setAttribute("darkMode", true)
            : appWrapper.removeAttribute("darkMode");
    };

    const navigateFn = (boardName) => {
        store.update((prev) => {
            return {
                ...prev,
                activeBoard: boardName,
            };
        });
    };
</script>

<nav id="navBar">
    <span class="totalBoardIndicator">Board-({boardList.length})</span>

    <div class="boardList">
        {#each boardList as board}
            <div
                on:click={() => navigateFn(board)}
                activeLink={board === $store.activeBoard}
                class="boardName"
            >
                <img src={note} alt="Icon" />
                <li>{board}</li>
            </div>
        {/each}
    </div>

    <button on:click={showDialogFn}>Add Board</button>

    <div class="toggleModeWrapper">
        <img src={sun} alt="LightMode" />

        <label for="modeInput">
            <input on:click={toggleModeFn} type="checkbox" id="modeInput" />
            <div id="toggleFill"></div>
        </label>

        <img src={moon} alt="DarkMode" />
    </div>

    <Dialog dialogId="navDialog" />
</nav>

<style>
    #navBar {
        display: flex;
        flex-direction: column;

        background-color: inherit;
        color: inherit;
    }

    .totalBoardIndicator {
        font-weight: var(--fw-600);
        letter-spacing: 2px;
        font-size: 0.8rem;
        padding: 1rem;
    }

    .boardList {
        list-style: none;
        padding: 0;

        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        overflow: scroll;
        overflow-x: hidden;
        max-height: 20rem;
    }

    .boardName {
        padding: 0.5rem 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        font-weight: var(--fw-600);
    }

    .boardName[activeLink="true"] {
        color: var(--white-900);
        background-color: var(--acc);
        border-radius: 100px 10px 100px 10px;
    }

    .boardName:hover:not([activeLink="true"]) {
        background-color: rgba(186, 182, 182, 0.302);
        border-radius: 100px 10px 100px 10px;
    }

    .boardName img {
        width: 1.3rem;
        order: -1;
    }

    #navBar > button {
        margin: 1rem 0;
        padding: 1.5rem;
    }

    .toggleModeWrapper {
        padding: 1rem;
        border-radius: 5px;
        background-color: var(--black-500);

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }

    .toggleModeWrapper > img {
        width: 1.2rem;
    }

    label {
        display: inline-block;
        border-radius: 1rem;
        border: 1px solid var(--acc);
    }
    input {
        display: none;
    }

    #toggleFill {
        border-radius: 1rem;
        position: relative;
        height: 30px;
        width: 80px;
        transition: background-color 0.30s ease;
    }
    #toggleFill::after {
        content: "";
        position: absolute;
        background-color: var(--white-900);
        width: 1rem;
        height: 1rem;
        border-radius: 1rem;
        margin: 4px;
    }

    input:checked ~ div::after {
        right: 0;
    }

    input:checked ~ div {
        background-color: var(--acc);
    }
</style>

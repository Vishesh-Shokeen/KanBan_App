<script>
    import store from "../Store";

    export let dialogId;

    $: data = $store
    let dialog;
    let name = "";

    const addFn = () => {
        switch (dialogId) {
            case "navDialog":

            store.update(prev => {
                return{
                    ...prev,
                    'data':{
                        ...prev['data'],
                        [name.toUpperCase()]:{}
                    }
                }
            })
            name=''
                break;
            case "boardDialog":


            store.update(prev => {
                return{
                    ...prev,
                    'data':{
                        ...prev['data'],
                        [data.activeBoard]:{
                            ...prev['data'][data.activeBoard],
                            [name.toUpperCase()]:{}
                        }
                    }
                }
            })
            name=''
                break;
            default:
                console.log("Something went wrong");
        }
    };

    const handleKeyFn = (e) => {
        e.key === "Enter" ? addFn() : null;
    };

    const closeFn = (e) => {
        e.target === dialog ? dialog.close() : null;
    };
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
    bind:this={dialog}
    id={dialogId}
    on:click={closeFn}
    on:keydown={handleKeyFn}
    >
    <div>
        <input type="text" bind:value={name} />
        <button on:click={addFn}>Update</button>
    </div>
</dialog>

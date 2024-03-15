<script>
    export let subTaskDone = 0;
    export let totalSubTask = 1;
</script>

<progress value={subTaskDone} max={totalSubTask} id="progressBar"></progress>

<style>
    progress {
        all: unset;
        display: inline-flex;
        height: 3px;

        width: 100%;
    }
    ::-moz-progress-bar {
        background: rgb(104, 255, 96);
    }
</style>

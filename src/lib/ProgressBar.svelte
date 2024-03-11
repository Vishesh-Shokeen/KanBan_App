<script>
    export let subTaskDone = 0;
    export let totalSubTask = 1;
</script>
<progress value={subTaskDone} max={totalSubTask} id="progressBar"></progress>

<style>
    progress{
        all: unset;
        height: 3px;
        width: -moz-available;
    }
    ::-moz-progress-bar{
        background: rgb(13, 255, 0);
    }
</style>
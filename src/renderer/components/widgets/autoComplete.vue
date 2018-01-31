<template>
    <div>
        <b>#{{item.stockName}}</b>
    </div>
</template>

<script>
    export default {
        name: 'auto-complete',
        props: {
            item: { required: true },
            searchText: { required: true }
        }
    }
</script>

<style scoped>

</style>
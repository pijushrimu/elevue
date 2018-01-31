<template>
    <div>
        <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
            <div class="container">
                <div class="navbar-tabs">
                    <a class="navbar-item is-tab" :class="{ 'is-active' : isActive('Sales')}"
                       @click="changeView('Sales')">Sales</a>
                    <a class="navbar-item is-tab" :class="{ 'is-active' : isActive('Purchase')}"
                       @click="changeView('Purchase')">Purchase</a>
                    <a class="navbar-item is-tab" :class="{ 'is-active' : isActive('Stock')}"
                       @click="changeView('Stock')">Stock</a>
                </div>
            </div>
        </nav>
        <br/>
        <div class="container">
            <stock v-if="viewToken === 'Stock'"></stock>
            <sales v-if="viewToken === 'Sales'"></sales>
            <purchase v-if="viewToken === 'Purchase'"></purchase>
        </div>
    </div>
</template>

<script>
    import Sales from './Sales/Sales'
    import Purchase from './Purchase/purchase'
    import Stock from './Stock/stock'

    export default {
        name: 'index',
        components: {
            Stock,
            Sales,
            Purchase
        },
        data () {
            return {
                viewToken: 'Sales'
            }
        },
        methods: {
            changeView (view) {
                this.viewToken = view
            },
            isActive (view) {
                if (this.viewToken === view) {
                    return true
                }
            }
        }
    }
</script>

<style scoped>

</style>
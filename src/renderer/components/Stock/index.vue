<template>
    <div>
        <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
            <div class="container">
                <div class="navbar-tabs">
                    <a class="navbar-item is-tab" :class="{ 'is-active' : isActive('Stock')}" @click="changeView('Stock')">Stock</a>
                    <a class="navbar-item is-tab" :class="{ 'is-active' : isActive('Location')}" @click="changeView('Location')">Location</a>
                    <a class="navbar-item is-tab" :class="{ 'is-active' : isActive('Units')}" @click="changeView('Units')">Units</a>
                </div>
            </div>
        </nav>
        <app-create-stock v-if="willShow === 'Stock'"></app-create-stock>
        <app-location v-if="willShow === 'Location'"></app-location>
        <app-units v-if="willShow === 'Units'"></app-units>
    </div>
</template>

<script>
    import Stock from './Stock/Stock'
    import Location from './Location/location'
    import Units from './Units/units'

    export default {
        name: 'index',
        data () {
            return {
                willShow: 'Stock'
            }
        },
        components: {
            appCreateStock: Stock,
            appLocation: Location,
            appUnits: Units
        },
        methods: {
            changeView (view) {
                this.willShow = view
            },
            isActive (view) {
                if (this.willShow === view) {
                    return true
                }
            },
            test () {
                alert('Done!!', 'Stock Manager')
            }
        }
    }
</script>

<style scoped>

</style>
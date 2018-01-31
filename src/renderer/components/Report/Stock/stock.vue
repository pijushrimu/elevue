<template>
    <div>
        <div class="box">
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <div>
                            <div class="subtitle">Filter Your Search</div>
                            <div class="select">
                                <select>
                                    <option selected disabled>All Item</option>
                                    <option>Party wise</option>
                                    <option>Period wise</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <div>
                            <div class="field has-addons">
                                <p class="control">
                                    <input class="input" type="text" placeholder="Find a location">
                                </p>
                                <p class="control">
                                    <button class="button">
                                        Search
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'stock'
    }
</script>

<style scoped>

</style>
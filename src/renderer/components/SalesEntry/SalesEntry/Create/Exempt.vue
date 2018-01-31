<template>
    <div>
        <table class="table is-bordered is-striped">
            <thead>
            <tr>
                <th><abbr title="Serial No.">Sl. No.</abbr></th>
                <th>HSN Code</th>
                <th>Items</th>
                <th><abbr title="Quantity">Qty</abbr></th>
                <th>Rate</th>
                <th>Discount</th>
                <th>Amount</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row,i) in rows">
                <th>{{ i + 1 }}</th>
                <td>
                    <input class="input" type="number" placeholder="HSN Code">
                </td>
                <td>
                    <input class="input" type="text" placeholder="Items">
                </td>
                <td>
                    <input class="input" type="number" placeholder="Qty">
                </td>
                <td>
                    <input class="input" type="number" placeholder="Rate">
                </td>
                <td>
                    <input class="input" type="number" placeholder="Discount">
                </td>
                <td>
                    <input class="input" type="number" placeholder="Amount">
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'exempt',
        data () {
            return {
                rows: [{}]
            }
        }
    }
</script>

<style scoped>

</style>
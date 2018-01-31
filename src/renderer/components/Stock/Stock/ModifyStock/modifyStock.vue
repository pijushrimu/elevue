<template>
    <div class="container">
        <div class="box">
            <nav class="level">
                <!-- Left side -->
                <div class="level-left">
                    <div class="level-item">
                        <p class="subtitle is-4">
                            Modify Stock
                        </p>
                    </div>
                </div>

                <!-- Right side -->
                <div class="level-right">
                    <div class="buttons">
                        <button class="button is-primary">Update</button>
                    </div>
                </div>
            </nav>
        </div>
        <table class="table is-bordered is-striped">
            <thead>
            <tr>
                <th><abbr title="Serial No.">Sl. No.</abbr></th>
                <th>Stock Name</th>
                <th>Category</th>
                <th>Opening Stock</th>
                <th><abbr title="Goods Sales Tax">GST( % )</abbr></th>
                <th>Rate</th>
                <th><abbr title="Unit Quantity Code">UQC</abbr></th>
                <th><abbr title="Rate Of Quantity">ROQ</abbr></th>
                <th>Location</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row,i) in rows">
                <th>{{ i + 1 }}</th>
                <td>
                    <input class="input" type="text" v-model="row.stockName" placeholder="Stock Name">
                </td>
                <td>
                    <div class="select">
                        <select>
                            <option selected>Pen</option>
                            <option>Laptop</option>
                            <option>Rice</option>
                        </select>
                    </div>
                </td>
                <td>
                    <input class="input" type="number" v-model="row.openingStock" placeholder="Opening Stock">
                </td>
                <td>
                    <input class="input" type="number" v-model="row.gst" placeholder="GST( % )">
                </td>
                <td>
                    <input class="input" type="number" v-model="row.rate" placeholder="Rate">
                </td>
                <td>
                    <div class="select">
                        <select>
                            <option selected>One</option>
                            <option>Two</option>
                        </select>
                    </div>
                </td>
                <td>
                    <input class="input" type="number" placeholder="R0Q" v-model="row.ROQ">
                </td>
                <td>
                    <div class="select">
                        <select>
                            <option selected>Gar ali</option>
                            <option>Na ali</option>
                        </select>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'modify-stock',
        data () {
            return {
                rows: []
            }
        },
        methods: {
            addRow () {
                this.rows.push({
                    stockName: 'Parker Pen',
                    category: 'xxx',
                    openingStock: 999,
                    gst: 13,
                    rate: 30,
                    UQC: '3',
                    ROQ: 25,
                    location: 'Jorhat'
                })
            }
        },
        created () {
            this.addRow()
        }
    }
</script>

<style scoped>

</style>
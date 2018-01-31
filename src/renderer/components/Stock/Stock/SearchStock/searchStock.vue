<template>
    <div class="container">
        <div class="box">

            <nav class="level">
                <!-- Left side -->
                <div class="level-left">
                    <div class="level-item">
                        <p class="subtitle is-4">
                            Your Stocks
                        </p>
                    </div>
                </div>

                <!-- Right side -->
                <div class="level-right">
                    <div class="level-item">
                        <div class="select">
                            <select>
                                <option selected>All Location</option>
                                <option v-for="location in locations">{{ location.locationName }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="level-item">
                        <div class="select">
                            <select>
                                <option selected>All Category</option>
                                <option v-for="category in categories">{{ category.category }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="level-item">
                        <div class="field has-addons">
                            <p class="control">
                                <input class="input" type="text" placeholder="Find a stock">
                            </p>
                            <p class="control">
                                <button class="button">
                                    Search
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        <table class="table is-bordered is-striped is-fullwidth">
            <thead>
            <tr>
                <th><abbr title="Serial No.">Sl. No.</abbr></th>
                <th>Stock Name</th>
                <th>HSN Code</th>
                <th>Opening Stock</th>
                <th>Tax Category</th>
                <th>Rate</th>
                <th><abbr title="Unit Quantity Code">UQC</abbr></th>
                <th><abbr title="Rate Of Quantity">ROQ</abbr></th>
                <th>Location</th>
                <th>Edit</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row,i) in rows">
                <th>{{ i + 1 }}</th>
                <td>
                    {{row.stockName}}
                </td>
                <td>
                    {{row.HSNCode}}
                </td>
                <td>
                    {{row.openingStock}}
                </td>
                <td>
                    {{row.category}}
                </td>
                <td>
                    {{row.rate}}
                </td>
                <td>
                    {{row.UQC}}
                </td>
                <td>
                    {{row.rate * row.openingStock}}
                </td>
                <td>
                    {{ row.location }}
                </td>
                <td><button class="button is-text">Edit</button></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import Datastore from 'nedb'

    export default {
        name: 'search-stock',
        data () {
            return {
                rows: [],
                db: {},
                categories: [],
                locations: []
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
            // this.addRow()
            this.db.stocks = new Datastore({ filename: 'stocks', autoload: true })
            this.db.stocks.find({}, (err, docs) => {
                if (err !== null) {
                    alert('Database Error', 'Stock Manager')
                } else {
                    docs.forEach(d => {
                        this.rows.push(d)
                    })
                }
            })
            this.db.categories = new Datastore({filename: 'categories', autoload: true})
            this.db.categories.find({}, (err, docs) => {
                if (err !== null) {
                    alert('Error')
                    console.log(err)
                } else {
                    docs.forEach(d => {
                        this.categories.push(d)
                    })
                    console.log(docs)
                }
            })
            this.db.location = new Datastore({ filename: 'location', autoload: true })
            this.db.location.find({}, (err, docs) => {
                if (err !== null) {
                    alert('Error')
                    console.log(err)
                } else {
                    docs.forEach(d => {
                        this.locations.push(d)
                    })
                    console.log(docs)
                }
            })
        }
    }
</script>

<style scoped>

</style>
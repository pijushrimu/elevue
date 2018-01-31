<template>
    <div class="container">
        <div class="box">
            <nav class="level">
                <!-- Left side -->
                <div class="level-left">
                    <div class="level-item">
                        <p class="subtitle is-4">
                            Add Stock
                        </p>
                    </div>
                </div>

                <!-- Right side -->
                <div class="level-right">
                    <div class="buttons">
                        <button class="button is-info" @click="viewAddCategory = true">Add Category</button>
                        <button class="button is-dark" @click="addRow">Add more row</button>
                        <button class="button is-primary" @click="submit">Submit</button>
                    </div>
                </div>
            </nav>
        </div>
        <table class="table is-bordered is-striped">
            <thead>
            <tr>
                <th><abbr title="Serial No.">Sl. No.</abbr></th>
                <th>Stock Name</th>
                <th><abbr title="HSN Code">HSN</abbr></th>
                <th><abbr title="Unit Quantity Code">UQC</abbr></th>
                <th>Tax Category</th>
                <th>Opening Stock</th>
                <th>Rate</th>
                <th><abbr title="Opening Stock x Rate">Amount</abbr></th>
                <th>Location</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row,i) in rows">
                <th>{{ i + 1 }}</th>
                <td>
                    <input class="input" type="text" placeholder="Stock Name" v-model="row.stockName">
                </td>
                <td>
                    <input class="input" type="number" placeholder="HSN code" v-model="row.HSNCode">
                </td>
                <td>
                    <div class="select">
                        <select v-model="row.UQC">
                            <option disabled selected>Select UQC</option>
                            <option v-for="unit in units">{{ unit.main }}</option>
                        </select>
                    </div>
                </td>
                <td>
                    <div class="select">
                        <select v-model="row.category">
                            <option disabled selected>Select Category</option>
                            <option v-for="category in categories">{{ category.category }}</option>
                        </select>
                    </div>
                </td>
                <td>
                    <input class="input" type="text" placeholder="Opening Stock" v-model="row.openingStock">
                </td>
                <td>
                    <input class="input" type="number" placeholder="Rate" v-model="row.rate">
                </td>
                <td>
                    <input class="input" type="number" placeholder="Amount" :value="row.rate * row.openingStock">
                </td>
                <td>
                    <div class="select">
                        <select v-model="row.location">
                            <option disabled selected>Select Location</option>
                            <option v-for="location in locations">{{ location.locationName }}</option>
                        </select>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="modal" :class="{'is-active': viewAddCategory}">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Add Category</p>
                    <button class="delete" aria-label="close" @click="viewAddCategory = false"></button>
                </header>
                <section class="modal-card-body">
                    <input class="input" type="text" placeholder="Category" v-model="category">
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" @click="addCategory">Add</button>
                    <button class="button" @click="viewAddCategory = false">Cancel</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable space-before-function-paren */
    import Datastore from 'nedb'

    export default {
        name: 'add-stock',
        data() {
            return {
                rows: [],
                db: {},
                categories: [],
                units: [],
                locations: [],
                category: '',
                viewAddCategory: false
            }
        },
        methods: {
            addRow() {
                this.rows.push({
                    stockName: '',
                    category: 'Select Category',
                    openingStock: 0,
                    rate: 0,
                    UQC: 'Select UQC',
                    HSNCode: 0,
                    location: 'Select Location'
                })
            },
            addCategory() {
                if (this.category !== '') {
                    let x = {
                        category: this.category
                    }
                    this.db.categories.insert(x)
                    this.categories.push(x)
                    this.category = ''
                    alert('Done!!', 'Stock Manager')
                    this.viewAddCategory = false
                } else {
                    alert('Non of the fields can be empty!!', 'Stock Manager')
                }
            },
            submit() {
                if (this.rows[0].stockName !== '') {
                   this.db.stocks.insert(this.rows)
                    this.rows = []
                    this.addRow()
                    alert('Done!!', 'Stock Manager')
                } else {
                    alert('Non of the fields can be empty!!', 'Stock Manager')
                }
            }
        },
        created() {
            this.addRow()
            this.db.stocks = new Datastore({ filename: 'stocks', autoload: true })
            this.db.units = new Datastore({ filename: 'units', autoload: true })
            this.db.units.find({}, (err, docs) => {
                if (err !== null) {
                    alert('Error')
                    console.log(err)
                } else {
                    docs.forEach(d => {
                        this.units.push(d)
                    })
                    console.log(docs)
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
    html {
        overflow: scroll;
    }
</style>
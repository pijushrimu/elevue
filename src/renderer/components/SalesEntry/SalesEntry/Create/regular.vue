<template>
    <div>
        <table class="table is-bordered is-striped">
            <thead>
            <tr>
                <th><abbr title="Serial No.">Sl. No.</abbr></th>
                <th>Items</th>
                <th>HSN Code</th>
                <th><abbr title="Unit">UQC</abbr></th>
                <th><abbr title="Quantity">Qty</abbr></th>
                <th>Rate</th>
                <th>Discount</th>
                <th><abbr title="Tax able value">Tax ( % )</abbr></th>
                <th><abbr title="GST">GST</abbr></th>
                <th>Amount</th>
                <th>Other</th>
                <th>Total Amount</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row,i) in rows">
                <th>{{ i + 1 }}</th>
                <td>
                    <v-autocomplete :input-attrs="{class: 'input', type: 'text'}" :items="stocks" v-model="row.stock" :get-label="(i) => i != null ? i.stockName : ''" :component-item='template'></v-autocomplete>
                </td>
                <td>
                    <input class="input" type="number" placeholder="HSN Code" v-model="row.stock.HSNCode">
                </td>
                <td>
                    <input class="input" type="number" placeholder="UQC" v-model="row.stock.UQC">
                </td>
                <td>
                    <input class="input" type="number" placeholder="Qty" v-model="row.quantity">
                </td>
                <td>
                    <input class="input" type="number" placeholder="Rate" v-model="row.rate">
                </td>
                <td>
                    <input class="input" type="number" placeholder="Discount" v-model="row.discount">
                </td>
                <td>
                    <input class="input" type="number" placeholder="Tax" v-model="row.stock.category">
                </td>
                <td>
                    <input class="input" type="number" placeholder="GST" v-model="row.gst.value">
                </td>
                <td>
                    <input class="input" type="number" placeholder="Amount" v-model="row.amount">
                </td>
                <td>
                    <input class="input" type="number" placeholder="Amount" v-model="row.other">
                </td>
                <td>
                    <input class="input" type="number" placeholder="Amount" v-model="row.totalAmount">
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import AutoComplete from 'vue2-autocomplete-js'
    import temp from '../../../widgets/autoComplete'

    import Datastore from 'nedb'

    export default {
        name: 'regular',
        components: {
            AutoComplete
        },
        props: ['data'],
        data () {
            return {
                rows: [],
                db: {},
                stocks: [],
                item: [],
                template: temp
            }
        },
        methods: {
            getData (obj) {
                console.log(obj)
            },
            addRow () {
                const x = {
                    stock: '',
                    quantity: '',
                    rate: '',
                    gst: {
                        type: 'CGST',
                        value: ''
                    },
                    amount: '',
                    discount: '',
                    other: '',
                    totalAmount: ''
                }
                this.rows.push(x)
            }
        },
        created () {
            this.db.stocks = new Datastore({ filename: 'stocks', autoload: true })
            this.db.stocks.find({}, (err, docs) => {
                if (err) {
                    alert('Database Error', 'Stock Manager')
                } else {
                    docs.forEach(d => {
                        this.stocks.push(d)
                    })
                }
            })
            this.addRow()
            this.$parent.$on('addRowEvent', this.addRow)
        },
        computed: {
            gstType () {
            }
        }
    }
</script>

<style>
    .v-autocomplete .v-autocomplete-list {
        width: 100%;
        text-align: left;
        border: none;
        border-top: none;
        max-height: 400px;
        overflow-y: auto;
        border-bottom: 1px solid #157977;
    }
    .v-autocomplete .v-autocomplete-list .v-autocomplete-list-item {
        cursor: pointer;
        background-color: #fff;
        padding: 10px;
        border-bottom: 1px solid #157977;
        border-left: 1px solid #157977;
        border-right: 1px solid #157977;
    }
    .v-autocomplete .v-autocomplete-list .v-autocomplete-list-item:last-child {
        border-bottom: none;
    }
    .v-autocomplete .v-autocomplete-list .v-autocomplete-list-item:hover {
        background-color: #eee;
    }
    .v-autocomplete .v-autocomplete-list .v-autocomplete-list-item abbr {
        opacity: 0.8;
        font-size: 0.8em;
        display: block;
        font-family: sans-serif;
    }
</style>
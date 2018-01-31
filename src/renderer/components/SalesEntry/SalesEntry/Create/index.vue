<template>
    <div class="container">
        <div class="box">
            <nav class="level">
                <div class="level-left">
                    <div class="level-item">
                        <div>
                            <div class="subtitle">Invoice date:</div>
                            <input class="input" type="date">
                        </div>
                    </div>
                    <div class="level-item">
                        <div>
                            <div>
                                <div class="subtitle">Billing Format</div>
                                <div class="select">
                                    <select v-model="viewToken">
                                        <option>Select a format</option>
                                        <option>Regular</option>
                                        <option>Composite</option>
                                        <option>Exempt</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="level-item">
                        <div>
                            <div>
                                <div class="subtitle">Party A/C Name:</div>
                                <div class="select">
                                    <select>
                                        <option disabled selected>Select a A/C</option>
                                        <option v-for="account in party">{{account.name}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="level-item">
                        <div>
                            <div>
                                <div class="subtitle">Invoice No:</div>
                                <input class="input" placeholder="Invoice no" v-model="invoiceNumber">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <button class="button is-info" @click="$emit('addRowEvent')">Add Row</button>
                    </div>
                    <div class="level-item">
                        <button class="button is-dark" @click="addParty = true">Add Party</button>
                    </div>
                </div>
            </nav>
        </div>
        <regular v-if="viewToken === 'Regular'"></regular>
        <composite v-if="viewToken === 'Composite'"></composite>
        <exempt v-if="viewToken === 'Exempt'"></exempt>
        <app-add-party :update="update" :show="addParty" @toggle="addParty = $event"></app-add-party>
    </div>
</template>

<script>
    import regular from './regular'
    import composite from './composite'
    import exempt from './Exempt'
    import appAddParty from '../../../widgets/addParty'
    import Datastore from 'nedb'
    import { mapGetters } from 'vuex'

    export default {
        components: {
            regular,
            composite,
            exempt,
            appAddParty
        },
        data () {
            return {
                viewToken: 0,
                addParty: false,
                party: [],
                db: {},
                invoiceNumber: 0,
                invoice: {
                    number: 0,
                    prefix: '',
                    suffix: 0,
                    enable: false
                }
            }
        },
        methods: {
            update (data) {
                 this.party.push(data)
            },
            formatInvoiceNumber (setting) {
                if (setting.enable) {
                    this.invoiceNumber = setting.prefix + setting.number + setting.suffix
                } else {
                    this.invoiceNumber = 0
                }
            }
        },
        created () {
            this.db.party = new Datastore({filename: 'party', autoload: true})
            this.db.party.find({}, (err, docs) => {
                if (err !== null) {
                    alert('Error', 'Stock Manager')
                    console.log(err)
                } else {
                    docs.forEach(d => {
                        this.party.push(d)
                    })
                    console.log(docs)
                }
            })
        },
        computed: {
            ...mapGetters([
                'getInvoice',
                'getInvoicePrefix',
                'getInvoiceSuffix',
                'getEnableInvoice',
                'getBillFormat'
            ])
        },
        watch: {
            getBillFormat () {
                this.viewToken = this.getBillFormat
            },
            getInvoice () {
                this.invoice.number = this.getInvoice
                this.formatInvoiceNumber(this.invoice)
            },
            getInvoiceSuffix () {
                this.invoice.suffix = this.getInvoiceSuffix
                this.formatInvoiceNumber(this.invoice)
            },
            getInvoicePrefix () {
                this.invoice.prefix = this.getInvoicePrefix
                this.formatInvoiceNumber(this.invoice)
            },
            getEnableInvoice () {
                this.invoice.enable = this.getEnableInvoice
                this.formatInvoiceNumber(this.invoice)
            }
        },
        mounted () {
            this.viewToken = this.getBillFormat
            this.invoice.number = this.getInvoice
            this.invoice.suffix = this.getInvoiceSuffix
            this.invoice.prefix = this.getInvoicePrefix
            this.invoice.enable = this.getEnableInvoice
            this.formatInvoiceNumber(this.invoice)
        }
    }
</script>

<style scoped>

</style>
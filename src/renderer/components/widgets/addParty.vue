<template>
    <div class="modal" :class="{'is-active': show }">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Add Party</p>
                <button class="delete" aria-label="close" @click="$emit('toggle',!show)"></button>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label class="label">Party Name</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="e.g M/S XYZ" v-model="party.name">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Goods and Services Tax Identification Number (GSTIN)</label>
                    <div class="control">
                        <input class="input" maxlength="15" placeholder="e.g. 22AAAAA0000A1Z5" v-model="party.gstin">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Address</label>
                    <div class="control">
                        <textarea class="textarea" placeholder="e.g G. S Road, Block No. 23 " v-model="party.address"></textarea>
                    </div>
                </div>
                <div class="field is-grouped">
                    <div class="control">
                        <div class="subtitle is-4">State</div>
                    </div>
                    <div class="control">
                        <div class="select">
                            <select v-model="party.state">
                                <option value="" disabled>State</option>
                                <option>Guwahati</option>
                                <option>Sivasaghar</option>
                                <option>Dibrughar</option>
                            </select>
                        </div>
                    </div>
                    <div class="control">
                    <div class="subtitle is-4">District</div>
                    </div>
                    <div class="control">
                        <div class="select">
                            <select v-model="party.district">
                                <option value="" disabled>District</option>
                                <option>Guwahati</option>
                                <option>Sivasaghar</option>
                                <option>Dibrughar</option>
                            </select>
                        </div>
                    </div>
                    <div class="control">
                        <div class="subtitle is-4">Country</div>
                    </div>
                    <div class="control">
                        <div class="select">
                            <select v-model="party.country">
                                <option value="" selected disabled>Country</option>
                                <option>Guwahati</option>
                                <option>Sivasaghar</option>
                                <option>Dibrughar</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="field is-grouped">
                    <p class="control">
                        <label class="subtitle is-4">Pin</label>
                    </p>
                    <p class="control">
                        <input class="input" type="number" placeholder="e.g 785001" v-model="party.pin">
                    </p>
                    <p class="control">
                        <label class="subtitle is-4">Phone</label>
                    </p>
                    <p class="control">
                        <input class="input" type="number" placeholder="Your Phone" v-model="party.phone">
                    </p>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="add">Add</button>
                <button class="button" @click="$emit('toggle',!show)">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script>
    import Datastore from 'nedb'
    import { eventBus } from '../../main'

    export default {
        name: 'add-party',
        props: {
            'show': Boolean,
            'update': Function
        },
        data () {
            return {
                party: {
                    name: '',
                    gstin: '',
                    address: '',
                    state: '',
                    district: '',
                    phone: '',
                    country: ''
                },
                db: {}
            }
        },
        methods: {
            add () {
                this.db.party.insert(this.party, (err, doc) => {
                    if (!err) {
                        alert('Done!!', 'Stock Manager')
                        this.$emit('toggle', !this.show)
                        // doc.forEach(d => this.update(d))
                        // console.log(`Call back ${doc}`)
                    }
                })
                this.update(this.party)
                eventBus.$emit('newParty', this.party)
            }
        },
        created () {
            this.db.party = new Datastore({filename: 'party', autoload: true})
        }
    }
</script>

<style scoped>

</style>
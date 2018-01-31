<template>
    <div class="section">
        <div class="box">
            <table class="table is-fullwidth is-bordered">
                <thead>
                <tr>
                    <th>Party Name</th>
                    <th>GSTIN</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>District</th>
                    <th>State</th>
                    <th>Country</th>
                    <th></th>
                </tr>
                </thead>
                <tbody v-if="!enableEdit">
                <tr v-for="(party,i) in partyList">
                    <td>{{party.name}}</td>
                    <td>{{party.gstin}}</td>
                    <td>{{party.phone}}</td>
                    <td>{{party.email}}</td>
                    <td>{{party.address}}</td>
                    <td>{{party.district}}</td>
                    <td>{{party.state}}</td>
                    <td>{{party.country}}</td>
                    <td>
                        <button class="button is-dark" @click="() => { enableEdit = true; selectedParty = party }">Edit</button>
                    </td>
                </tr>
                </tbody>
                <tbody v-else>
                <tr>
                    <td>
                        <input class="input" v-model="selectedParty.name" type="text"/>
                    </td>
                    <td>
                        <input class="input" v-model="selectedParty.gstin" type="text"/>
                    </td>
                    <td>
                        <input class="input" v-model="selectedParty.phone" type="number"/>
                    </td>
                    <td>
                        <input class="input" v-model="selectedParty.email" type="email"/>
                    </td>
                    <td>
                        <input class="input" v-model="selectedParty.address" type="text"/>
                    </td>
                    <td>
                        <input class="input" v-model="selectedParty.district" type="text"/>
                    </td>
                    <td>
                        <input class="input" v-model="selectedParty.state" type="text"/>
                    </td>
                    <td>
                        <input class="input" v-model="selectedParty.country" type="text"/>
                    </td>
                    <td>
                        <button class="button is-dark" @click="save">Save</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import Datastore from 'nedb'

    export default {
        name: 'index',
        props: {
            'show': Boolean
        },
        data () {
            return {
                db: {},
                partyList: [],
                enableEdit: false,
                selectedParty: {}
            }
        },
        methods: {
            update () {
                this.partyList = []
                this.db.party.find({}, (err, docs) => {
                    if (err !== null) {
                        alert('Error', 'Stock Manager')
                        console.log(err)
                    } else {
                        docs.forEach(d => {
                            this.partyList.push(d)
                        })
                        // console.log(docs)
                    }
                })
            },
            save () {
                // console.log(this.selectedParty)
                this.db.party.update({ _id: this.selectedParty._id }, this.selectedParty, {}, (err, doc) => {
                    if (err) {
                        console.log(err)
                    } else {
                        this.update()
                    }
                })
                this.enableEdit = false
            }
        },
        created () {
            this.db.party = new Datastore({filename: 'party', autoload: true})
            this.update()
        }
    }
</script>

<style scoped>

</style>
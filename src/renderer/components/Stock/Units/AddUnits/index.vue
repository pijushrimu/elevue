<template>
    <div class="container">
        <div class="box">

            <nav class="level">
                <!-- Left side -->
                <div class="level-left">
                    <div class="level-item">
                        <p class="subtitle is-4">
                            Add Unit
                        </p>
                    </div>
                </div>

                <!-- Right side -->
                <div class="level-right">
                    <div class="level-item">
                        <div class="buttons">
                            <button class="button is-info" @click="viewAddCategory = true">Add Category</button>
                            <button class="button is-dark" @click="addRow">Add More Row</button>
                            <button class="button is-primary" @click="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        <table class="table is-bordered is-striped is-fullwidth">
            <thead>
            <tr>
                <th>Serial no.</th>
                <th>Main</th>
                <th>Sub</th>
                <th>Conversion</th>
                <th>Category</th>

            </tr>
            </thead>
            <tbody>
            <tr v-for="(row,i) in rows">
                <th>{{ i + 1 }}</th>
                <td>
                    <input class="input" type="text" placeholder="Main" v-model="row.main">
                </td>
                <td>
                    <input class="input" type="text" placeholder="Sub" v-model="row.sub">
                </td>
                <td>
                    <input class="input" type="number" placeholder="Conversion" v-model="row.conversion">
                </td>
                <td>
                    <div class="select">
                        <select v-model="row.category">
                            <option disabled selected>Select Category</option>
                            <option v-for="cat in categories">{{ cat.category }}</option>
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
        name: 'index',
        data() {
            return {
                rows: [],
                db: {},
                category: '',
                categories: [],
                viewAddCategory: false
            }
        },
        methods: {
            addRow() {
                this.rows.push({
                    main: '',
                    sub: '',
                    conversion: 0,
                    category: 'Select Category'
                })
            },
            submit() {
                if (this.rows[0].main !== '') {
                    this.db.units.insert(this.rows)
                    alert('Done!!', 'Stock Manager')
                    this.rows = []
                } else {
                    alert('Non of the Fields can be empty!!', 'Stock Manager')
                }
            },
            addCategory() {
                if (this.category !== '') {
                    let x = {
                        category: this.category
                    }
                    this.db.categories.insert(x, (err, newDoc) => {
                        if (err !== null) {
                            console.log(err)
                        } else {
                            console.log(newDoc)
                        }
                    })
                    this.categories.push(x)
                    this.category = ''
                    alert('Done!!', 'Stock Manager')
                    this.viewAddCategory = false
                } else {
                    alert('Non of the Fields can be empty!!', 'Stock Manager')
                }
            }
        },
        created () {
            this.addRow()
            this.db.units = new Datastore({ filename: 'units', autoload: true })
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
        }
    }
</script>

<style scoped>

</style>
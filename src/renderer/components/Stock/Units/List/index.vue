<template>
    <div class="container">
        <div class="box">

            <nav class="level">
                <!-- Left side -->
                <div class="level-left">
                    <div class="level-item">
                        <p class="subtitle is-4">
                            List Unit
                        </p>
                    </div>
                </div>

                <!-- Right side -->
                <div class="level-right">
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
                <th>Serial no.</th>
                <th>Main</th>
                <th>Sub</th>
                <th>Category</th>
                <th>Conversion</th>
                <th>Remove</th>
                <th>Edit</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row,i) in rows">
                <th>{{ i + 1 }}</th>
                <td>
                    {{row.main}}
                </td>
                <td>
                    {{row.sub}}
                </td>
                <td>
                    {{row.category}}
                </td>
                <td>
                    {{row.conversion}}
                </td>
                <td>
                    <button class="button is-text">Remove</button>
                </td>
                <td>
                    <button class="button is-text">Edit</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import Datastore from 'nedb'

    export default {
        name: 'index',
        data () {
            return {
                rows: [],
                db: {}
            }
        },
        methods: {
            addRow () {
                this.rows.push({
                    main: '1 Dozen',
                    sub: 'Piece',
                    category: 'Egg',
                    conversion: 12
                })
            }
        },
        created () {
            // this.addRow()
            this.db.units = new Datastore({ filename: 'units', autoload: true })
            this.db.units.find({}, (err, docs) => {
                if (err !== null) {
                    alert('Error')
                    console.log(err)
                } else {
                    docs.forEach(d => {
                        this.rows.push(d)
                    })
                }
            })
        }
    }
</script>

<style scoped>

</style>
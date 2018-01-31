<template>
    <div class="container">
        <div class="box">

            <nav class="level">
                <!-- Left side -->
                <div class="level-left">
                    <div class="level-item">
                        <p class="subtitle is-4">
                            Modify Unit
                        </p>
                    </div>
                </div>

                <!-- Right side -->
                <div class="level-right">
                    <div class="level-item">
                        <div class="buttons">
                            <button class="button is-primary">Update</button>
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
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row,i) in rows">
                <th>{{ i + 1 }}</th>
                <td>
                    <input class="input" type="text" v-model="row.main" placeholder="Main">
                </td>
                <td>
                    <input class="input" type="text" v-model="row.sub" placeholder="Sub">
                </td>
                <td>
                    <div class="select">
                        <select>
                            <option selected>Egg</option>
                            <option>Pen</option>
                            <option>Category 2</option>
                        </select>
                    </div>
                </td>
                <td>
                    <input class="input" type="text" v-model="row.conversion" placeholder="Conversion">
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data () {
            return {
                rows: []
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
            this.addRow()
        }
    }
</script>

<style scoped>

</style>
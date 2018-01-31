<template>
    <section class="section">
        <div class="box">
            <nav class="level">
                <div class="level-left">
                    <div class="level-item">
                        <div>
                            <div class="subtitle">Date</div>
                            <input class="input" type="date">
                        </div>
                    </div>
                    <div class="level-item">
                        <div>
                            <div>
                                <div class="subtitle">Challan No.</div>
                                <input class="input disabled" value="333"  type="number">
                            </div>
                        </div>
                    </div>
                    <div class="level-item">
                        <div>
                            <div>
                                <div class="subtitle">Party A/C Name:</div>
                                <div class="select">
                                    <select>
                                        <option selected disabled>Select</option>
                                        <option>Party 1</option>
                                        <option>Party 2</option>
                                        <option>Party 3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <div>
                            <div>
                                <button class="button is-dark">Add Party</button>
                            </div>
                        </div>
                    </div>
                    <div class="level-item">
                        <div>
                            <div>
                                <button class="button is-info">Print</button>
                            </div>
                        </div>
                    </div>
                    <div class="level-item">
                        <div>
                            <div>
                                <button class="button is-primary">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        <table class="table is-bordered is-striped">
            <thead>
            <tr>
                <th><abbr title="Serial No.">Sl. No.</abbr></th>
                <th>HSN Code</th>
                <th>Items</th>
                <th><abbr title="Quantity">Qty</abbr></th>
                <th>Description</th>
                <th>Taxable Value</th>
                <th><abbr title="Tax able value">Tax ( % )</abbr></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row,i) in rows">
                <th>{{ i + 1 }}</th>
                <td>
                    <input class="input" type="number" placeholder="HSN Code">
                </td>
                <td>
                    <input class="input" type="text" placeholder="Items">
                </td>
                <td>
                    <input class="input" type="number" placeholder="Qty">
                </td>
                <td>
                    <input class="input" type="text" placeholder="Description">
                </td>
                <td>
                    <input class="input" type="number" placeholder="Taxable Value">
                </td>
                <td>
                    <input class="input" type="number" placeholder="Tax">
                </td>
            </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
    export default {
        name: 'index',
        data () {
            return {
                rows: [{}]
            }
        }
    }
</script>

<style scoped>

</style>
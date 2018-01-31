<template>
    <section class="section">
        <div class="box">
            <nav class="level">
                <div class="level-left">
                    <div class="level-item">
                        <div>
                            <div class="subtitle">Debit Note Number:</div>
                            <input class="input" placeholder="Number" type="number">
                        </div>
                    </div>
                    <div class="level-item">
                        <div>
                            <div>
                                <div class="subtitle">Original Invoice No.:</div>
                                <input class="input" placeholder="invoice" type="number">
                            </div>
                        </div>
                    </div>
                    <div class="level-item">
                        <div>
                            <div>
                                <div class="subtitle">Original date:</div>
                                <input class="input" placeholder="invoice" type="date">
                            </div>
                        </div>
                    </div>
                    <div class="level-item">
                        <div>
                            <div>
                                <div class="subtitle">Current Date:</div>
                                <input class="input" placeholder="date" type="date">
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
                <th>Rate</th>
                <th>Discount</th>
                <th><abbr title="Tax able value">Tax ( % )</abbr></th>
                <th><abbr title="GST">GST</abbr></th>
                <th>Amount</th>
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
                    <input class="input" type="number" placeholder="Rate">
                </td>
                <td>
                    <input class="input" type="number" placeholder="Discount">
                </td>
                <td>
                    <input class="input" type="number" placeholder="Tax">
                </td>
                <td>
                    <input class="input" type="number" placeholder="GST">
                </td>
                <td>
                    <input class="input" type="number" placeholder="Amount">
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
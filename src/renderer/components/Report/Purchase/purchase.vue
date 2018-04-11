<template>
    <div>
        <div class="box">
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <div>
                            <div class="subtitle">Filter Your Search</div>
                            <div class="select">
                                <select>
                                    <option selected disabled>All Party - All Period</option>
                                    <option>Party wise</option>
                                    <option>Period wise</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <table class="table is-bordered is-striped is-fullwidth">
            <thead>
            <tr>
                <th>Date</th>
                <th>Invoice No.</th>
                <th>Items</th>
                <th>Party Name</th>
                <th>Taxable Value</th>
                <th><abbr title="Goods Sales Tax">GST</abbr></th>
                <th>Bill Amount</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row,i) in rows">
                <th>{{ i + 1 }}</th>
                <td>
                    {{ row.date }}
                </td>
                <td>
                    {{ row.invoice }}
                </td>
                <td>
                    {{ row.partyName }}
                </td>
                <td>
                    {{row.taxValue}}
                </td>
                <td>
                    {{ row.GST }}
                </td>
                <td>
                    {{ row.amount }}
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
  name: "purchase",
  data() {
    return {
      rows: [
        {
          date: "1-4-2017",
          invoice: "XUV20151212",
          partyName: "Mr X",
          GST: "2500",
          amount: 55500,
          taxValue: 222,
        },
        {
          date: "2-4-2017",
          invoice: "ABC20151213",
          partyName: "Mr Y",
          GST: "2500",
          amount: 55500,
          taxValue: 222,
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>

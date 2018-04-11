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
                <th>Serial no.</th>
                <th>Date</th>
                <th>Invoice No.</th>
                <th>Party Name</th>
                <th>Bill Amount</th>
                <th>Detail</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row,i) in rows">
                <th>{{ i + 1 }}</th>
                <td>
                    {{ row.detail.date }}
                </td>
                <td>
                    {{ row.detail.invoice }}
                </td>
                <td>
                    {{ row.detail.party.name }}
                </td>
                <td>
                    {{ row.detail.allTotal }}
                </td>
                <td>
                    <button class="button is-info">View Detail</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Datastore from "nedb";

export default {
  name: "sales",
  data() {
    return {
      rows: [],
      db: {},
    };
  },
  created() {
    this.db.sales = new Datastore({ filename: "sales", autoload: true });
    this.db.sales.find({}, (err, docs) => {
      if (err) {
        alert("Database Error", "Stock Manager");
      } else {
        docs.forEach(d => {
          this.rows.push(d);
        });
      }
    });
  },
};
</script>

<style scoped>

</style>

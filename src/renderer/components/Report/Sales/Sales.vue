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
                                    <option>Invoice number</option>
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
                <th>Invoice No.</th>
                <th>Invoice Date</th>
                <th>Party Name</th>
                <th>GST NO</th>
                <th>Total Taxable Amount</th>
                <th>Total GST</th>
                <th>Total Amount</th>
            </tr>
            </thead>
            <tbody>
                <!-- "detail":{"invoice":"ANV17PR","date":"2018-04-11","party":"cash","totalAmount":128.57600000000002} -->
            <tr v-for="(row,i) in rows">
                <th>{{ i + 1 }}</th>
                <td>
                    {{ row.detail.invoice }}
                </td>
                <td>
                    {{ row.detail.date }}
                </td>
                <td>
                    {{ row.detail.party }}
                </td>
                <td>
                    // gst no
                </td>
                <td>
                    // total taxable amount
                </td>
                <td>
                    // total gst
                </td>
                
                <td>
                    {{ row.detail.totalAmount }}
                </td>
                <td>
                    <button class="button is-info" @click="editEntry(row._id)">Edit</button>
                </td>
            </tr>
            </tbody>
        </table>
        <app-modify-sale-entry :showModidyModelView=showModifyModel @toggleModityEntryView="showModifyModel = $event"></app-modify-sale-entry>
    </div>
</template>

<script>
import Datastore from "nedb";
import appModifySaleEntry from '../../widgets/modifySaleEntry';

export default {
  name: "sales",
  components: {
    appModifySaleEntry,
  },
  data() {
    return {
      rows: [],
      db: {},
      showModifyModel:false,
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
  methods:{
      editEntry(id){
          console.log(id);
          this.showModifyModel = true;
      }
  }
};
</script>

<style scoped>

</style>

<template>
    <div>
        <div class="box">
            <div class="level">
                <div class="level-left">
                    <div>
                        <div class="subtitle">Filter Your Search</div>
                        <div class="level-item">
                            <div class="select">
                                <select v-model="selectedParty">
                                    <option  selected  value="">All Party</option>
                                    <option  value="cash">Cash</option>
                                    <option v-for="name in party">{{name.name}}</option>
                                </select>
                            </div>
                          <div class="select">
                            <select @change="searchSelectChanged($event)">
                              <option  selected >All Period</option>

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
            <tbody >
                <!-- "detail":{"invoice":"ANV17PR","date":"2018-04-11","party":"cash","totalAmount":128.57600000000002} -->
            <tr v-for="(row,i) in filterList" >
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
                    {{row.detail.gstNo}}
                </td>
                <td>
                    {{row.detail.getTotalTaxableAmount}}
                </td>
                <td>
                    {{row.detail.totalGst}}
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
    </div>
</template>

<script>
import Datastore from "nedb";

export default {
  name: "editSales",
  components: {
  },
  data() {
    return {
      rows: [],
      loaded: false,
      db: {},
      showModifyModel:false,
      type:"SALES",
      row:{},
      searchSelectType:0,
      party: [],
      selectedParty: "",
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
    this.db.party = new Datastore({ filename: "party", autoload: true });
    this.db.party.find({}, (err, docs) => {
      if (err !== null) {
        alert("Error");
        console.log(err);
      } else {
        docs.forEach(d => {
           this.party.push(d);
        });
      }
      this.loaded = true;
    });
  },
  mounted(){
      this.$electron.ipcRenderer.on('reload',()=>{
          console.log("reload called");
          this.reloadRows();
      })
  },
  computed:{
    filterList () {
      if(this.selectedParty === ''){
        console.log("All party!!");
        return this.rows;
      } else {
        console.log("single party!!");
        return this.rows.filter(data => data.detail.party === this.selectedParty)
      }
    }
    // end of computes
  },
  methods:{
      searchSelectChanged(e){
          this.searchSelectType = e.target.selectedIndex;
          console.log(this.searchSelectType)
      },
      editEntry(id){
          this.$electron.ipcRenderer.send("edit",id);
      },

      reloadRows(){
          this.rows = [];
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
  }
};
</script>

<style scoped>

.select,.input{
  margin-right: 20px;
}
</style>

<template>
    <div>
        <div class="box">
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <div>
                            <div class="subtitle">Filter Your Search</div>
                            <div class="select">
                                <select v-model="selectedParty">
                                    <option selected value="">All Party</option>
                                    <option  value="cash">Cash</option>
                                    <option v-for="party in rows" v-if="party.detail.party.name">{{party.detail.party.name}}</option>
                                           
                                </select>
                            </div>
                            <div class="select">
                                <select v-model="selectedPeriods" :disabled="selectedParty.length == 0">
                                    <option selected value="">All Periods</option>
                                    <option v-for="date in count">{{date.detail.date}}</option>
                                </select>
                            </div>
                            <input type="text" placeholder="Start date" v-model="period1" :disabled="selectedPeriods.length == 0">
                            <input type="text" v-model="period2" :disabled="period1.length == 0">
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
                <th>Party Name</th>
                <th>Items</th>
                <th>Taxable Value</th>
                <th><abbr title="Goods Sales Tax">GST</abbr></th>
                <th>Bill Amount</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row,i) in filterList">
                <th>{{ row.detail.date }}</th>
                <td>
                    {{ row.detail.invoice }}
                </td>
                <td> 
                 <div v-if="row.detail.party.name">
                 {{row.detail.party.name}}
                 </div> 
                 <div v-else>
                 {{row.detail.party}}
                 </div> 
                </td>
                <td v-for="items in row.items">
                    {{ items.stockName }}
                </td>
                
                <td v-for="items in row.items">
                   {{items.taxableValue}}
                </td>
               
                <td v-for="items in row.items">
                    {{ items.gst }}
                </td>
                <td>
                    {{ row.amount }}
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
  name: "purchase",
  data() {
    return {
      rows:[],
       db: {},
       selectedParty:'',
       selectedPeriods:'',
       count:'',
       period1:'',
       period2:'',
    };
  },
  created() {
    this.db.purchase_entry = new Datastore({ filename: "purchase_entry", autoload: true });
    this.db.purchase_entry.find({}, (err, docs) => {
      if (err) {
        alert("Database Error", "Stock Manager");
      } else {
        docs.forEach(d => {
          this.rows.push(d);
        });
        console.log('purchase',this.rows);
      }
    })
  },
  computed:{
      filterList(){
          if(this.selectedParty===''){
              return this.rows;
          }else if(this.selectedParty!='' && this.selectedPeriods===''){
          return this.rows.filter(data=>(data.detail.party.name===this.selectedParty || data.detail.party===this.selectedParty));
          }
           else if(this.selectedPeriods!='' && this.period1===''){
             return this.rows.filter(data => ((data.detail.party.name===this.selectedParty || data.detail.party===this.selectedParty)&& data.detail.date===this.selectedPeriods));
      }
      else{
          return this.count.filter((data)=>{
              let setdate=data.detail.date;
              console.log(setdate);
              return (setdate>=this.period1 && setdate<=this.period2);
          })
      }
          
      }
      
  },
   watch: {
        selectedParty: function() {
            if (this.selectedParty.length > 0) {
              console.log(this.selectedParty)
               this.count=this.rows.filter(data=>(data.detail.party.name===this.selectedParty||data.detail.party===this.selectedParty));
               console.log(this.count);
                
            }
        }
    },
methods:{
    editEntry(id){
          console.log(id);
          this.$electron.ipcRenderer.send("Create",id);
      }
}
};
</script>

<style scoped>

</style>

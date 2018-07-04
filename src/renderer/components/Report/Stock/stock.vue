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
                                    <option selected value="">All Item</option>
                                    <option v-for="stock in stocks">{{stock.stockName}}</option>
                                    
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <div>
                            <div class="field has-addons">
                                <p class="control">
                                    <input class="input" type="text" placeholder="Find a location">
                                </p>
                                <p class="control">
                                    <button class="button">
                                        Search
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  
    <br>
    <div id="table">
     <table class="table is-bordered is-striped is-fullwidth">
            <thead>
            <tr>
                <th>Serial no</th>
                <th>Stock Name</th>
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
            <tr v-for="(row,i) in rows" >
                <th>{{ i + 1 }}</th>
                <td v-for="items in row.items">
                    {{items.stockName}}
                </td>
                <td>
                    {{row.detail.invoice}}
                </td>
                <td>
                   {{row.detail.date}}
                </td>
                <td>
                    {{row.detail.party}}
                </td>
                <td>
                   {{row.detail.date}}
                </td>
                <td>
                   {{row.detail.getTotalTaxableAmount}}
                </td>
                <td>
                   {{row.detail.totalGst}}
                </td>
                <td>
                   {{row.detail.totalAmount}}
                </td>
                
                <td>
                    <button class="button is-info" @click="editEntry(row._id)">Edit</button>
                </td>
            </tr>
            </tbody>
        </table>
        </div>
        </div>
</template>

<script>
import Datastore from "nedb";
export default {
  name: "stock",
  data(){
      return {
          stocks:[],
          db:{},
          rows:[],
    };
  },
   created() {
    this.db.stocks = new Datastore({ filename: "stocks", autoload: true });
    this.db.stocks.find({}, (err, docs) => {
      if (err) {
        alert("Database Error", "Stock Manager");
      } else {
        docs.forEach(d => {
          this.stocks.push(d);
        });
        console.log('stock',this.stocks);
      }
    })
    this.db.sales = new Datastore({ filename: "sales", autoload: true });
    this.db.sales.find({}, (err, docs) => {
      if (err !== null) {
        alert("Error");
        console.log(err);
      } else {
        docs.forEach(d => {
           this.rows.push(d);
        });
      }
       console.log('sll',this.rows);
    });
   }
};
</script>

<style scoped>
#table{
    overflow-y:true;
}

</style>

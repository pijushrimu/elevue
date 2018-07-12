<template>
    <div class="container">
        <div class="box">

            <nav class="level">
                <!-- Left side -->
                <div class="level-left">
                    <div class="level-item">
                        <p class="subtitle is-4">
                            Your Stocks
                        </p>
                    </div>
                </div>

                <!-- Right side -->
                <div class="level-right">

                    <div class="level-item">
                        <div class="buttons">
                            <button class="button is-" @click="printList">Export To</button>
                        </div>
                        <div class="field has-addons">
                            <p class="control">
                                <input class="input" v-model="search" type="text" placeholder="Find a stock">
                            </p>
                            <p class="control select">

                                    <select v-model="searchBy">
                                        <option disabled selected>Search By</option>
                                        <option value="0" >Stock Name</option>
                                        <option  value="1" >Stock Group</option>
                                        <option value="2" >Unit Name</option>
                                    </select>

                            </p>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        <div class="scrollable">
        <table class="table is-bordered is-striped is-fullwidth scrollable">
            <thead>
            <tr>
                <th>Sl. No.</abbr></th>
                <th>Stock Name</th>
                <th>HSN</abbr></th>
                <th>Unit Name</abbr></th>
                <th>Stock Groups</abbr></th>
                <th>Tax Category</th>
                <th>Opening Stock</th>
                <th>Rate</th>
                <th>Amount</th>
                <!-- <th>Location</th> -->
                <th>Selling Price</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row,i) in filterList">
                <th>{{ i + 1 }}</th>
                <td>
                    {{row.stockName}}
                </td>
                <td>
                    {{row.HSNCode}}
                </td>
                <td>
                    {{row.unitName}}
                </td>
                <td>
                    {{row.stockGroup}}
                </td>
                <td>
                    {{row.taxCategory}}
                </td>
                <td>
                    {{row.openingStock}}
                </td>
                <td>
                    {{row.rate}}
                </td>
                <td>
                    {{row.amount}}
                </td>
                <td>
                    {{ row.defaultSP }}
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
  name: "search-stock",
  data() {
    return {
      rows: [],
      db: {},
      categories: [],
      locations: [],
      search:"",
      searchBy:"0",
    };
  },
  methods: {
    addRow() {
      this.rows.push({
        stockName: "",
        HSNCode: 0,
        unitName: "",
        stockGroup: "",
        taxCategory: "",
        openingStock: 0,
        rate: 0,
        amount: 0,
        defaultSP:0,
        location: "",
      });
    },
    printList:function(){
      let data = {
        name:"anvaya",
        title:"Stock List",
        table:this.rows,
      }

      this.$electron.ipcRenderer.send("showPrint",data);
  },
  },
  computed:{
    filterList:function(){
      return this.rows.filter((data)=>{
        let patt = new RegExp("^"+this.search+"");
        switch(this.searchBy){
            case "0":
             return data.stockName.match(patt);
            case "1":
            return data.stockGroup.match(patt);
            case "2":
            return data.unitName.match(patt);
        }

      })
    }
  },
  created() {
    // this.addRow()
    this.db.stocks = new Datastore({ filename: "stocks", autoload: true });
    this.db.stocks.find({}, (err, docs) => {
      if (err !== null) {
        alert("Database Error", "Stock Manager");
      } else {
        docs.forEach(d => {
          this.rows.push(d);
        });
      }
    });
    this.db.categories = new Datastore({
      filename: "categories",
      autoload: true,
    });
    this.db.categories.find({}, (err, docs) => {
      if (err !== null) {
        alert("Error");
        console.log(err);
      } else {
        docs.forEach(d => {
          this.categories.push(d);
        });

      }
    });
    // this.db.location = new Datastore({ filename: "location", autoload: true });
    // this.db.location.find({}, (err, docs) => {
    //   if (err !== null) {
    //     alert("Error");
    //     console.log(err);
    //   } else {
    //     docs.forEach(d => {
    //       this.locations.push(d);
    //     });
    //     console.log(docs);
    //   }
    // });
  },
};
</script>

<style scoped>
#table-scroll{
    overflow-y:auto;
    overflow-x: hidden;
    height:360px;
}
</style>

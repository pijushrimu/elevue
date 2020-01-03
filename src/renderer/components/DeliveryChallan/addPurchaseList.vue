<template>
  <div>
    <div class="scrollable">
      <table class="table is-bordered is-striped">
        <thead>
          <tr>
            <th>
              <abbr title="Serial No.">Sl.</abbr>
            </th>
            <th>Items</th>
            <th>HSN Code</th>
            <th>
              <abbr title="Quantity">Qty</abbr>
            </th>
            <th>Rate</th>
            <th>Amount</th>
            <th>Discount</th>
            <th>Taxable Value</th>
            <th>Tax %</th>
            <th>GST</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,i) in rows" :key="i">
            <th>{{ i + 1 }}</th>
            <td>
              <auto-complete
                ref="complete"
                v-if="reload"
                :items="stocks"
                v-model="row.stockName"
                v-on:Selected="selected($event,i)"
              ></auto-complete>
            </td>
            <td>
              <input class="input" type="number" placeholder="HSN Code" v-model="row.HSNCode" />
            </td>
            <td>
              <input
                class="input"
                type="number"
                placeholder="Qty"
                v-model="row.quantity"
                @input="quantityOrRateChanged(i)"
              />
            </td>
            <td>
              <input
                class="input"
                type="number"
                placeholder="Rate"
                v-model="row.rate"
                @input="quantityOrRateChanged(i)"
              />
            </td>
            <td>
              <input class="input" type="number" placeholder="Qty x Rate" v-model="row.amount" />
            </td>
            <td>
              <input
                class="input"
                type="number"
                placeholder="Discount"
                v-model="row.discount"
                @input="discountChanged(row.flag,i)"
              />
              <br />
              <input
                class="checkbox"
                name="percentage"
                type="checkbox"
                @change="percentageChanged($event,i)"
              />
              <label for="percentage">Percentage</label>
            </td>
            <td>
              <input
                class="input"
                type="number"
                placeholder="Taxable Value"
                v-model="row.taxableValue"
              />
            </td>
            <td>
              <input
                class="input"
                type="number"
                placeholder="Tax Rate"
                v-model="row.taxPer"
                @input="taxChanged(i)"
              />
            </td>
            <td>
              <input class="input" type="number" placeholder="GST" v-model="row.gst" />
            </td>
            <td>
              <input
                class="input"
                type="number"
                placeholder="Total Amount"
                v-model="row.totalAmount"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="sumary">
      <table class="table is-bordered is-striped">
        <thead>
          <tr>
            <th>
              <abbr title="Points">CGST/SGST</abbr>
            </th>
            <th>
              <abbr title="Points">IGST</abbr>
            </th>
          </tr>
        </thead>
        <tbody>
          <td>7899</td>
          <td>7899</td>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Datastore from "nedb";

import autoComplete from "../widgets/autoComplete";

export default {
  name: "addPurchaseList",
  components: {
    autoComplete
  },
  props: ["data"],
  data() {
    return {
      rows: [],
      db: {},
      reload: true,
      stocks: [],
      stockName: [],
      item: [],
      viewDiscount: false
    };
  },
  methods: {
    refresh(data) {
      this.stocks.push(data);
    },
    quantityOrRateChanged(i) {
      this.rows[i].amount = this.rows[i].quantity * this.rows[i].rate;
      this.discountChanged(this.rows[i].flag, i);
    },
    percentageChanged(event, i) {
      this.rows[i].flag = event.target.checked;
      this.discountChanged(event.target.checked, i);
    },
    discountChanged(flag, i) {
      if (flag) {
        this.rows[i].taxableValue =
          this.rows[i].amount * (1 - this.rows[i].discount / 100);
      } else {
        this.rows[i].taxableValue = this.rows[i].amount - this.rows[i].discount;
      }

      this.gstChnaged(i);
    },
    taxChanged(i) {
      this.gstChnaged(i);
    },

    gstChnaged(i) {
      this.rows[i].gst =
        (this.rows[i].taxableValue * this.rows[i].taxPer) / 100;
      this.getTotalAmount(i);
    },
    getTotalAmount(i) {
      this.rows[i].totalAmount = this.rows[i].taxableValue + this.rows[i].gst;
    },
    submit() {
      // console.log("a")
      if (this.checkFields()) {
        const x = {
          items: this.rows,
          detail: {
            invoice: this.data.invoice,
            date: this.data.date,
            party: this.data.party
          }
        };
        let child = this.$refs.complete;
        this.db.purchaseEntry.insert(x, err => {
          if (err) {
            alert("Error Try Again!!", "Stock Manager");
          } else {
            this.rows = [];
            this.addRow();
            alert("Done!!", "Stock Manager");
            child[0].refresh();
            this.$store.dispatch("incrementInvoice");
          }
        });
      } else {
        alert("None of the Fields can be empty", "Stock Manager");
      }
    },
    selected(event, i) {
      let stock = this.findStock(event)[0];
      let row = this.rows[i];
      row.stockName = stock.stockName;
      row.HSNCode = stock.HSNCode;
      row.rate = stock.defaultSP;
      row.taxPer = stock.taxCategory;
    },
    addRow() {
      const x = {
        stockName: "",
        HSNCode: "",
        quantity: "",
        rate: "",
        amount: "",
        discount: "",
        taxableValue: "",
        taxPer: "",
        gst: "",
        totalAmount: "",
        flag: false
      };
      this.rows.push(x);
    },
    getTotal() {
      let total = 0;
      for (const row of this.rows) {
        total += Number.parseInt(row.totalAmount, 10);
      }
      return total;
    },
    checkFields() {
      let nullValues = true;

      this.rows.forEach(data => {
        if (data.stockName == "") {
          nullValues = false;
        }
      });

      return nullValues;
    },
    findStock: function(name) {
      let patt = new RegExp("\\b" + name + "\\b");
      // console.log(patt)
      return this.stocks.filter(data => {
        return data.stockName.match(patt);
      });
    }
  },
  created() {
    this.db.stocks = new Datastore({ filename: "stocks", autoload: true });
    this.db.stocks.find({}, (err, docs) => {
      if (err) {
        alert("Database Error", "Stock Manager");
      } else {
        docs.forEach(d => {
          this.stocks.push(d);
          this.stockName.push(d.stockName);
        });
      }
    });

    [...Array(10).keys()].map(() => this.addRow());
    this.$parent.$on("addRowEvent", this.addRow);
    this.$parent.$on("submitEventExempt", this.submit);
    this.db.purchaseEntry = new Datastore({
      filename: "purchase_entry",
      autoload: true
    });
  },
  computed: {
    filterList: function() {
      return this.stocks.filter(data => {
        let patt = new RegExp("^" + this.search + "");
        return data.stockName.match(patt);
      });
    }
    // end of computes
  }
};
</script>

<style scoped>
#table-scroll {
  overflow-y: auto;
  overflow-x: hidden;
}
.sumary {
  position: absolute;
  bottom: 10px;
}
</style>

<template>
  <div class="container">
    <div class="box">
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-4">
              Tax Rate
            </p>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <div class="buttons">
            <button class="button is-primary">Add New Rate</button>
            <button class="button is-dark">Back</button>
          </div>
        </div>
      </nav>
    </div>
  <table class="table is-bordered is-striped is-fullwidth">
    <thead>
      <tr>
        <th>Serial no.</th>
        <th>Tax Rate</th>
        <th>Applicable From</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row,i) in rows">
          <td>{{ i + 1 }}</td>
          <td>
            {{row.rate}}
          </td>
          <td>
            {{row.date}}
          </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
  import Datastore from "nedb";

  export default {
    name: "tax-rate",
    props: ["categoryName"],
    data() {
      return {
        db: {},
        rows: []
      }
    },
    created() {
      this.db.categories = new Datastore({filename: "categories", autoload: true});
      this.db.categories.findOne({category: this.categoryName}, (err, docs) => {
        if (err !== null) {
          alert("Error");
          console.log(err);
        } else {
          this.rows.push(docs.rateList);
        }
      });
    }
  }
</script>

<style scoped>


</style>

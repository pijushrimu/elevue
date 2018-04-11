<template>
    <div class="modal " :class="{'is-active': showModidyModelView }">
        <div class="modal-background"></div>
        <div class="modal-card modalSize">
            <header class="modal-card-head">
                <p class="modal-card-title">Add Party</p>
                <button class="delete" aria-label="close" @click="$emit('toggleModityEntryView',!showModidyModelView)"></button>
            </header>
            <section>
                <div class="box">
                    <nav class="level">
                        <div class="level-left">
                            <div class="level-item">
                                <div>
                                      <div class="subtitle">Invoice date:</div>
                                       <input class="input" type="date">
                                </div>
                            </div>
                            <div class="level-item">
                                <div>
                                      <div class="subtitle">Party A/C Name:</div>
                                      <div class="select">
                                        <select>
                                            <option  value="cash" selected>cash</option>
                                            <option>asd</option>
                                            <option>asasd</option>
                                        </select>
                                      </div>
                                </div>
                            </div>
                            <div class="level-item">
                                <div>
                                    <div class="subtitle">Invoice No:</div>
                                    <input class="input" placeholder="Invoice no">
                                </div>
                            </div>
                            
                            <!--  -->
                        </div>
                        <div class="level-right">
                                <div class="level-item">
                                    <button class="button is-info" >Add Row</button>
                                </div>
                                <div class="level-item">
                                    <button class="button is-dark" >Remove Row</button> 
                                </div>
                                <div class="level-item">
                                    <button class="button is-success" >Save</button>
                                </div>
                        </div>
                    </nav>
                </div>
                
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="add">Add</button>
                <button class="button" @click="$emit('toggleModityEntryView',!showModidyModelView)">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script>

export default {
  name: "add-party",
  components:{
    
  },
  props: {
    showModidyModelView: Boolean,
    updateParty: Function,
  },
  data() {
    return {
      party: {
          name:"",
          type:"Select Type",
          registerType:"",
          gstin:"",
          phone:"",
          address:"",
          pin:"",
          district:"",
          state:"",
          country:""
      },
      db: {},
    };
  },
  methods: {
    add() {
    },
  },
  created() {
    
  },
};
</script>

<style scoped>
.modalSize{
    width: 90%;
}
</style>

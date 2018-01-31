<template>
    <div>
        <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
            <div class="container">
                <div class="navbar-tabs">
                    <a class="navbar-item is-tab" :class="{ 'is-active' : isActive('Debit Note')}" @click="changeView('Debit Note')">Debit Note</a>
                    <a class="navbar-item is-tab" :class="{ 'is-active' : isActive('Credit Note')}" @click="changeView('Credit Note')">Debit Note</a>
                </div>
            </div>
        </nav>
        <app-debit-note v-if="willShow === 'Credit Note'"></app-debit-note>
        <app-credit-note v-if="willShow === 'Debit Note'"></app-credit-note>
    </div>
</template>

<script>
    import appDebitNote from './DebitNote'
    import appCreditNote from './CreditNote'

    export default {
        name: 'note',
        components: {
          appCreditNote,
          appDebitNote
        },
        data () {
            return {
                willShow: 'Debit Note'
            }
        },
        methods: {
            changeView (view) {
                this.willShow = view
            },
            isActive (view) {
                if (this.willShow === view) {
                    return true
                }
            }
        }
    }
</script>

<style scoped>

</style>
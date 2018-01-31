import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home-page',
            component: require('@/components/Stock').default
        },
        {
            path: '/sales',
            name: 'sales-page',
            component: require('@/components/SalesEntry/sales').default
        },
        {
            path: '/purchase',
            name: 'purchase-page',
            component: require('@/components/PurchaseEntry').default
        },
        {
            path: '/note',
            name: 'note',
            component: require('@/components/Note/note').default
        },
        {
            path: '/party',
            name: 'party',
            component: require('@/components/Party').default
        },
        {
            path: '/delivery',
            name: 'delivery-page',
            component: require('@/components/DeliveryChallan').default
        },
        {
            path: '/report',
            name: 'report-page',
            component: require('@/components/Report').default
        },
        {
            path: '/print',
            name: 'print',
            component: require('@/components/Print').default
        }
    ]
})

import Vue from 'vue';
import VueRouter from 'vue-router';
import UsersList from '../pages/UsersList.vue';

Vue.use(VueRouter)
    const routes = [
        {
            path: '/users',
            name: 'UsersList',
            component: UsersList
        },
        {
            path: '/users/:id',
            name: 'user',
            component: () => import('../pages/User.vue')
        }, 
        {
            path: '/adduser',
            name: 'AddUser',
            component: () => import('../pages/AddUser.vue')
        }
    ]
    const router = new VueRouter({
        routes
    })

    export default router;
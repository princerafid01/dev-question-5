import Welcome from './pages/Welcome.vue'
import Posts from './pages/Posts.vue'
import Categories from './pages/Categories.vue'

const routes = [
    { path: '/', component: Welcome , name: 'welcome'},
    { path: '/posts', component: Posts , name: 'posts'},
    { path: '/categories', component: Categories,  name: 'categories' }
];

export default routes;
import { createWebHistory, createRouter } from 'vue-router'
import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'
import Main from '../components/Main.vue'
import PublicPage from '../components/PublicPage.vue'
import CurrentSymptoms from '../components/CurrentSymptoms.vue'
import Content from '../components/Content.vue'
import ContentPublic from '../components/ContentPublic.vue'
import NotFound from '../components/NotFound.vue'



// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    { 
      path: '/login', 
      name: 'Login',
      component: Login,
      showRoute: ['public']
    },
    { 
      path: '/signup', 
      name: 'Sign up',
      component: SignUp,
      showRoute: ['public']
    },
    { 
      path: '/main', 
      name: 'Main',
      component: Main,
      showRoute: ['private']
    },
    { 
      path: '/public', 
      name: 'Public',
      component: PublicPage,
      showRoute: ['public', 'private']
    },
    { 
      path: '/currentSymptoms', 
      name: 'Current Symptoms',
      component: CurrentSymptoms,
      showRoute: ['public', 'private']
    },

    { 
      path: '/folders/:folderId', 
      name: 'Content',
      component: Content,
      showRoute: []
    },
    { 
      path: '/folders/:idFolder/:nameUser/:nameFolder/public', 
      name: 'ContentPublic',
      component: ContentPublic,
      showRoute: []
    },
    {
      path: "/:catchAll(.*)", 
      name: "Not found",
      component: NotFound,
      showRoute: []
    }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
  const publicPages = routes.filter(route => route.showRoute.includes('public')).map(route => route.path)
  const authNotRequired = publicPages.some(v => to.path.includes(v));
  const loggedIn = localStorage.getItem('user');


  // trying to access a restricted page + not logged in
  // redirect to login page
  if (!authNotRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
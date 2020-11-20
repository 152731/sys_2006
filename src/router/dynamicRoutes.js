
 import Home from "../pages/Home"
const dynamicRoutes=[
 {
    path: "/",
    name: "home",
    children:[],
    component:Home
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../pages/Home")
  },
  {
    path:"*",
    component:()=>import(/* webpackChunkName  :"page404"*/ "../pages/pages404")
   },
]
export default dynamicRoutes
const dynamicRoutes=[
 {
    path: "/",
    name: "home",
    children:[],
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Home")
  },
  {
    path:"*",
    component:()=>import(/* webpackChunkName  :"page404"*/ "../pages/pages404")
   },

]
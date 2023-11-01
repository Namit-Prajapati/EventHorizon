const express=require('express')
const router=express.Router()
const loginRoutes=require('./authRoutes')
const studentRoutes=require('./studentRoutes')
const facultyRoutes=require('./facultyRoutes')
const adminRoutes=require('./adminRoutes')
const changePasswordRoute = require('./changePassRoute')

const Routes=[
    {
        path:'/auth/login',
        route:loginRoutes
    },
    {
        path:'/student',
        route:studentRoutes
    },
    {
        path:'/faculty',
        route:facultyRoutes
    },
    {
        path:'/admin',
        route:adminRoutes
    },
    {
        path:'/changepassword',
        route:changePasswordRoute
    },
]

Routes.forEach((route)=>{
    router.use(route.path,route.route)
})
module.exports=router
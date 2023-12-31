
const adminController =require("../controllers/Admin")

function route (app) {
    app.use('/admin/order',adminController.checkoutRotes);
    
    app.use('/admin/UserList',adminController.UserListRoutes);


    app.use('/admin/email',adminController.emailRoutes);

    app.use('/admin/dashboard',adminController.dashboardRoutes);


    app.use('/admin/Product',adminController.uploadProductRoute);


    app.use('/admin/uploadCategories',adminController.CategoriesRoutes);



}

module.exports = route;

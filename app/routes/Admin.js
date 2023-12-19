
// app\routes\Admin.js
const adminController =require("../controllers/Admin")

function route (app) {
    app.use('/admin/chart',adminController.chartRoutes);
    
    app.use('/admin/table',adminController.tableRoutes);


    app.use('/admin/email',adminController.emailRoutes);

    app.use('/admin/dashboard',adminController.dashboardRoutes);


    app.use('/admin/uploadProduct',adminController.uploadProductRoute);


    app.use('/admin/uploadCategories',adminController.CategoriesRoutes);

}

module.exports = route;

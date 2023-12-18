
// app\routes\Admin.js
const adminController =require("../controllers/Admin")

function route (app) {
    app.use('/admin/chart',adminController.chartRoutes);
    
    app.use('/admin/table',adminController.tableRoutes);

    app.use('/admin/form',adminController.formRoutes);

    app.use('/admin/email',adminController.emailRoutes);

    app.use('/admin/dashboard',adminController.dashboardRoutes);
}

module.exports = route;

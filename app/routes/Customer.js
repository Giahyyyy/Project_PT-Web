// routes/customerRoutes.js
// app\routes\Customer.js
const cusController =require("../controllers/Customer")

function route (app) {
    app.use('/site',cusController.siteRoutes);
    
    app.use('/contact',cusController.contactRoutes);
    app.use('/checkout',cusController.checkoutRoutes);
    app.use('/cart',cusController.cartRoutes);
    app.use('/authen',cusController.authenticationRoutes);

    app.use('/detail',cusController.PrductdetalsRoutes);
    app.use('/shop',cusController.shopRoutes);
    app.use('/user',cusController.userDashboardRoutes);
    
   
}

module.exports = route;

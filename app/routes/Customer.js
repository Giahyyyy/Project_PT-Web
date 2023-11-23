// routes/customerRoutes.js
// app\routes\Customer.js
const cusController =require("../controllers/Customer")

function route (app) {
    app.use('/cus/site',cusController.siteRoutes);
    app.use('/cus/contact',cusController.contactRoutes);
    app.use('/cus/checkout',cusController.checkoutRoutes);
    app.use('/cus/cart',cusController.cartRoutes);
    app.use('/cus/authen',cusController.authenticationRoutes);
   
}

module.exports = route;

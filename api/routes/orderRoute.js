const express = require('express') 
const router = express.Router(); 
const {isAuthenticated} = require('../middleware/auth');
const { createNewOrder, getSingleOrder, getAllOwnOrder, getAllOrders, changeOrderStatus, deleteOrder, checkout, paymentVerfication, getKey, getSingleAdminOrder } = require('../controllers/orderController');

router.route('/checkout').post(isAuthenticated,checkout) 
router.route("/getkey").get(isAuthenticated,getKey) 
router.route('/paymentverification').post(isAuthenticated,paymentVerfication)
router.route('/order/new').post(isAuthenticated,createNewOrder)
router.route('/order/:id').get(isAuthenticated,getSingleOrder) 
router.route('/orders').get(isAuthenticated,getAllOwnOrder) 

// admin routes 
router.route('/admin/orders').get(isAuthenticated,getAllOrders) 
router.route('/admin/order/:id').put(isAuthenticated,changeOrderStatus) 
.delete(isAuthenticated,deleteOrder).get(isAuthenticated,getSingleAdminOrder)

module.exports = router 
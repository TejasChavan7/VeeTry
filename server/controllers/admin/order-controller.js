const Order = require("../../models/Order");

const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.find({});
    if (!orders.length) {
      console.warn("No orders found!");
      return res.status(404).json({
        success: false,
        message: "No orders found!"
      });
    }
    console.info(`Found ${orders.length} orders`);
    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (e) {
    console.error('Error fetching orders:', e.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching orders"
    });
  }
};

const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      console.warn(`Order with id ${id} not found!`);
      return res.status(404).json({
        success: false,
        message: `Order with id ${id} not found!`
      });
    }
    console.info(`Found order with id ${id}`);
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (e) {
    console.error('Error fetching order details:', e.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching order details"
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(id, { orderStatus }, { new: true });
    if (!order) {
      console.warn(`Order with id ${id} not updated!`);
      return res.status(404).json({
        success: false,
        message: `Order with id ${id} not updated!`
      });
    }
    console.info(`Updated order status for id ${id} to ${orderStatus}`);
    res.status(200).json({
      success: true,
      message: `Order status updated successfully!`,
      data: order
    });
  } catch (e) {
    console.error('Error updating order status:', e.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating order status"
    });
  }
};

module.exports = {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
};


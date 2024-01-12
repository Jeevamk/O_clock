const express = require("express");
const route = express.Router();
const userCollection = require("../../model/user_model");
const authenticateJWT = require("../../middleware/auth");
const adminCollection = require("../../model/admin_model");
const orderCollection = require('../../model/order_model');
const productCollection = require('../../model/product_model');



const isSameDay = (date1, date2) => {
  const day1 = new Date(date1);
  const day2 = new Date(date2);
  return (
    day1.getUTCFullYear() === day2.getUTCFullYear() &&
    day1.getUTCMonth() === day2.getUTCMonth() &&
    day1.getUTCDate() === day2.getUTCDate()
  );
};

route.use(express.json());


route.get("/", authenticateJWT, async (req, res) => {
  if (req.cookies.session) {
    const adminid = await adminCollection.findOne({ _id: req.adminId });


    const orders = await orderCollection.aggregate([
      { $group: { _id: '$orderStatus', count: { $sum: 1 } } },

    ])

    let totalOrders = 0;
    let deliverdOrders = 0;;
    let cancelled =0;;
    let pendingOrders = 0;
    for (let order of orders) {
      console.log("order",order);
      totalOrders += order.count;

      if (order._id == "Delivered") {
        deliverdOrders = order.count ?? 0
      } else if (order._id == "Cancelled") {
        cancelled = order.count ?? 0 
      } else {
        pendingOrders += order.count
      }
    }
    const orderCount = { totalOrders, deliverdOrders, cancelled, pendingOrders }


    // current month

    const currentMonthOrders = await orderCollection.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $year: "$orderDate" }, { $year: "$$NOW" }] },
              { $eq: [{ $month: "$orderDate" }, { $month: "$$NOW" }] },
            ],
          },
        },
      },
      // {
      //   $match: {
      //     $expr: {
      //       $gt: [
      //         "$orderDate",
      //         {
      //           $dateSubtract: {
      //             startDate: "$$NOW",
      //             unit: "month",
      //             amount: 1,
      //           },
      //         },
      //       ],
      //     },
      //   },
      // },
    ]);

    const MonthOrders = [];
    const grandTotalSum = [];
    function getDaysInCurrentMonth() {
      const currentDate = new Date();

      const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      const numberOfDays = lastDayOfMonth.getDate();

      return numberOfDays;
    }


    for (let i = 1; i <= getDaysInCurrentMonth(); i++) {
      const filterData = currentMonthOrders.filter((obj) => {
        return new Date(obj.orderDate).getDate() === i;
      })
      let grandTotal = 0;
      for (j = 0; j < filterData.length; j++) {
        grandTotal += filterData[j].grandtotal;
      }
      grandTotalSum.push(grandTotal)

      MonthOrders.push(i)
    }



    //weeks//
    const currentWeekOrders = await orderCollection.aggregate([
      {
        $match: {
          $expr: {
            $gt: [
              "$orderDate",
              {
                $dateSubtract: {
                  startDate: "$$NOW",
                  unit: "day",
                  amount: 7,
                },
              },
            ],
          },
        },
      },
    ]);

    const weekOrders = [];
    for (i = 0; i < 7; i++) {
      var currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - i);

      var filterData = currentWeekOrders.filter((obj) => isSameDay(obj.orderDate, currentDate));
      var grandSumTotal = 0;

      for (j = 0; j < filterData.length; j++) {
        grandSumTotal += filterData[j].grandtotal;
      }
      weekOrders.push(grandSumTotal);
    }
 

    //year//
    const currentYearOrders = await orderCollection.aggregate([
      {
        $match: {
          $expr: {
            $gt: [
              "$orderDate",
              {
                $dateSubtract: {
                  startDate: "$$NOW",
                  unit: "month",
                  amount: 12,
                },
              },
            ],
          },
        },
      },
    ]);


    const yearOrders = [];
    for (i = 0; i < 12; i++) {
      var currentMonth = i;

      var filteredData = currentYearOrders.filter((obj) => {
        return obj.orderDate.getMonth() === currentMonth;
      }); 
      var grandTotal = 0;

      for (j = 0; j < filteredData.length; j++) {
        grandTotal += filteredData[j].grandtotal;
      }
      yearOrders.push(grandTotal);
    }
  


    const lastThreeOrders = await orderCollection.find().sort({ orderDate: -1 }).limit(5);






    res.render("admin_report", { admin: adminid, orderCount, MonthOrders, grandTotalSum, weekOrders,yearOrders ,lastThreeOrders});
  }
});









module.exports = route;
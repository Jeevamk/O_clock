const express = require("express");
const route = express.Router();
const adminCollection = require("../../model/admin_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = process.env.secretKey;
const authenticateJWT = require("../../middleware/auth");
const bodyparser = require("body-parser");
const { body, validationResult } = require("express-validator");
const parserencoded = bodyparser.urlencoded({ extended: false });
const productCollection = require("../../model/product_model")
const orderCollection = require("../../model/order_model");
const userCollection = require("../../model/user_model");
const categoryCollection = require("../../model/category_model");
const brandCollection = require("../../model/brand_model");
const bannerCollection = require("../../model/banner_model")



const isSameDay = (date1, date2) => {
  const day1 = new Date(date1);
  const day2 = new Date(date2);
  return (
    day1.getUTCFullYear() === day2.getUTCFullYear() &&
    day1.getUTCMonth() === day2.getUTCMonth() &&
    day1.getUTCDate() === day2.getUTCDate()
  );
};

// const session = require ('express-session')

route.use(express.json());

route.get("/", async (req, res) => {
  if (!req.cookies.session) return res.redirect("/adminhome/login");
  return res.redirect("/adminhome/index");
});

route.get("/index", authenticateJWT, async (req, res) => {
  if (!req.cookies.session) return res.redirect("/adminhome/login");
  const admin_detail = await adminCollection.findOne({ _id: req.adminId });

  //recent orders//
  lastOrders = await orderCollection.find()
  lastThreeOrders = lastOrders.slice(0,3)

  //count of user//
  const totalUsers = await userCollection.countDocuments({})
  //count of order//
  const totalOrders = await orderCollection.countDocuments({})
  //count of products//
  const totalProducts = await productCollection.countDocuments({})
 
  //total revenue//
 const totalRevenue = await orderCollection.aggregate([
  {
    $group: {
      _id: null,
      total: {
        $sum: "$grandtotal",
      },
    },
  },
]);
const revenue = totalRevenue[0].total;
console.log("revenue",revenue);


//orders details//
const orders = await orderCollection.aggregate([
  { $group: { _id: '$orderStatus', count: { $sum: 1 } } },

])

let totalorders = 0;
let deliverdOrders;
let cancelled;
let pendingOrders = 0;
for (let order of orders) {
  totalorders += order.count;

  if (order._id == "Delivered") {
    deliverdOrders = order.count
  } else if (order._id == "Cancelled") {
    cancelled = order.count
  } else {
    pendingOrders += order.count
  }
}
const orderCount = { totalorders, deliverdOrders, cancelled, pendingOrders }

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
  console.log("currentWeekOrders:", currentWeekOrders);
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
  console.log("weekOrders", weekOrders);


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

  console.log("currentYearOrders:", currentYearOrders);
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

  //five years//

  const lastFiveYearOrders = await orderCollection.aggregate([
    {
      $match: {
        $expr: {
          $gt: [
            "$orderDate",
            {
              $dateSubtract: {
                startDate: "$$NOW",
                unit: "year",
                amount: 5,
              },
            },
          ],
        },
      },
    },
  ]);

  const fiveYears = [];
  for (i = 0; i < 5; i++) {
    var current = new Date();
    current.setFullYear(current.getFullYear() - i);
    fiveYears.push(current.getFullYear());
  }
  const fiveYearAmounts = [];
  for (i = 0; i < fiveYears.length; i++) {
    const filteredData = lastFiveYearOrders.filter((obj) => {
      return new Date(obj.orderDate).getFullYear() === fiveYears[i];
    });
    let grandTotalSum = 0;
    for (j = 0; j < filteredData.length; j++) {
      grandTotalSum += filteredData[j].grandtotal;
    }
    fiveYearAmounts.push(grandTotalSum);
  }


  //count of category,brand,banner//
  totalCategory = await categoryCollection.countDocuments({});
  totalBanner = await bannerCollection.countDocuments({});
  totalBrand = await brandCollection.countDocuments({});

  





  res.render("admin_home", { admin: admin_detail ,lastThreeOrders,weekOrders,totalUsers,totalOrders ,totalProducts,revenue,orderCount,yearOrders,fiveYearAmounts,fiveYears,totalCategory,totalBanner,totalBrand});
});




// route.get('/signup',(req,res) =>{
//     res.render('signup')
// })

// route.post('/login_admin',async (req,res)=>{
//     try {
//         const password = req.body.password;
//         const cpassword = req.body.cpassword;

//         if (password === cpassword) {
//             const adminData = new adminCollection({
//                 name: req.body.name,
//                 email: req.body.email,
//                 phone: req.body.phone,
//                 password: req.body.password,
//                 cpassword: req.body.cpassword
//             })

//             const postData = await adminData.save();
//             res.render("login")

//         } else {
//             res.render('signup')
//             res.status(400);
//         }
//     }
//     catch (error) {
//         console.error('Error:',error);
//     }
// })

route.get("/login", (req, res) => {
  const key = req.cookies.session;
  if (key) {
    res.render("admin_home");
  } else {
    res.render("login");
  }
});

//login post//

route.post("/login_admin", async (req, res) => {
  if (req.cookies.session) {
    res.redirect("/adminhome");
  } else {
    try {
      const { email, loginpassword } = req.body;
      const adminemail = await adminCollection.findOne({ email });

      if (!adminemail) {
        return res.render("login", { show: true });
      }
      const passMatch = await bcrypt.compare(
        loginpassword,
        adminemail.password
      );
      if (!passMatch) return res.status(401).render("login", { alert: true });
      const token = jwt.sign({ adminId: adminemail._id }, secret);
      return res.cookie("session", token).redirect("/adminhome");
    } catch (err) {
      res.send(err);
    }
  }
});

//edit//

route.put("/update", authenticateJWT, async (req, res) => {
  try {
    const adminId = req.adminId;
    console.log(adminId);
    const updateAdmin = await adminCollection.findByIdAndUpdate(
      { _id: adminId },
      { $set: req.body }
    );

    res.cookie("updateToken", updateAdmin);
    res.json(updateAdmin);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


//logout//
route.get("/admin_logout", (req, res) => {
  if (req.cookies.session) {
    res.clearCookie("session");
    res.redirect("/adminhome");
  } else {
    res.render("login");
  }
});









module.exports = route;

const express = require("express");
const route = express.Router();
const categoryCollection = require("../../model/category_model");
const authenticateJWT = require("../../middleware/auth");
const adminCollection = require("../../model/admin_model");

route.use(express.json());

route.get("/", authenticateJWT, async (req, res) => {
  if (req.cookies.session) {
    const adminid = await adminCollection.findOne({ _id: req.adminId });
    const categoryList = await categoryCollection.find();
    res.render("adminCategory", { adminid, categoryList });
  } else {
    res.redirect("/adminhome");
  }
});

//add category//
route.post("/", async (req, res) => {
  const category = new categoryCollection({
    name: req.body.name,
    description: req.body.description,
  });
  category == (await category.save());

  if (!category) {
    return res.status(404).send("the category can not be created");
  } else {
    return res.redirect("/adminhome/category");
  }
});

//view single data//

route.get("/:id", async (req, res) => {
  if (req.cookies.session) {
    const catId = req.params.id;

    try {
      const categ = await categoryCollection.findOne({ _id: catId });
      if (categ) {
        res.json(categ);
      } else {
        res.status(404).json({ error: "category not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  } else {
    res.redirect("/adminhome");
  }
});

//update//

route.get("/update/:id", async (req, res) => {
  if (req.cookies.session) {
    const catId = req.params.id;

    try {
      const categoryUpdate = await categoryCollection.findOne({ _id: catId });

      if (categoryUpdate) {
        res.json(categoryUpdate);
      } else {
        res.status(404).json({ error: "category not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.redirect("/adminhome");
  }
});

route.put("/update", authenticateJWT, async (req, res) => {
  const catid = req.body.id;
  const categoryUpdateData = req.body;
  try {
    const categoryUpdate = await categoryCollection.findByIdAndUpdate(
      { _id: catid },
      { $set: categoryUpdateData }
    );

    if (categoryUpdate) {
      res.redirect(303, "/adminhome/category");
    } else {
      res.status(404).json({ error: "category not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//delete//

route.get("/delete_category/:id", async (req, res) => {
  if (req.cookies.session) {
    const catId = req.params.id;

    try {
      const catDelete = await categoryCollection.findOne({ _id: catId });

      if (catDelete) {
        res.json(catDelete);
      } else {
        res.status(404).json({ error: "category not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.redirect("/adminhome");
  }
});



route.delete("/delete_category", async (req, res) => {
  try {
    const catId = req.body.id;
    await categoryCollection.findByIdAndDelete(catId);
    res.redirect(303, "/adminhome/category");
  } catch (error) {
    res.send(error);
  }
});



// route.delete("/delete_category", async (req, res) => {
//   try {
//     const catId = req.body.id;

//     const associatedProducts = await productCollection.find({ categoryId: catId });

//     for (let product of associatedProducts) {
//       await productCollection.findByIdAndDelete(product._id);
//     }

//     await categoryCollection.findByIdAndDelete(catId);

//     res.redirect(303, "/adminhome/category");
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });



module.exports = route;

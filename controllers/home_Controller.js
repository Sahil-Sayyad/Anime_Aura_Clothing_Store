const Product = require("../models/product");
module.exports.home = async (req, res) => {
  try {
    const products = await Product.find({});

    if(products){
      return res.render("home", {
        title: "Anime Aura",
        products
      });
    }
    return res.redirect('/');
  } catch (err) {
    console.log(`error in home controller ${err}`);
    return;
  }
};

module.exports.about = async (req, res) => {
  try {
    return res.render("about", {
      title: "Anime Aura | About",
    });
  } catch (err) {
    console.log(`error in home controller ${err}`);
    return;
  }
};

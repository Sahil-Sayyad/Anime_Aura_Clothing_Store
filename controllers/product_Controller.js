
module.exports.cart = async (req, res) => {
    try {
      return res.render("cart", {
        title: "Anime Aura | Cart",
      });
    } catch (err) {
      console.log(`error in home controller ${err}`);
      return;
    }
  };
  module.exports.show = async (req, res) => {
    try {

      return res.render("product", {
        title: "Anime Aura | Product",
      });
    } catch (err) {
      console.log(`error in home controller ${err}`);
      return;
    }
  };
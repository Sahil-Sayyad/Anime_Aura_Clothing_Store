
module.exports.home = async (req, res) => {
  try {
    return res.render("home", {
      title: "Anime Aura",
    });
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

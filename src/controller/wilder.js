module.exports = {
  create: (req, res) => {
    console.log(req.body);
    res.send("hello from wilder controller");
  },
};

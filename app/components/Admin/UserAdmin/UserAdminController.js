const render = (req, res) => {
    
    if (req.isAuthenticated()) {
      res.render('UserAdmin/index', {user: req.user});
    }
    else {
      // Người dùng chưa xác thực, có thể chuyển hướng hoặc xử lý theo logic khác
      res.redirect('/authen/login'); // Chẳng hạn, chuyển hướng đến trang đăng nhập
  }
};
module.exports = {

  render,

};


  const renderDashboard = (req, res) => {
    // Kiểm tra xem người dùng đã xác thực hay chưa
    if (req.isAuthenticated()) {
        res.render('dashboard/index', {user: req.user});
    } else {
        // Người dùng chưa xác thực, có thể chuyển hướng hoặc xử lý theo logic khác
        res.redirect('/authen/login'); // Chẳng hạn, chuyển hướng đến trang đăng nhập
    }
};

module.exports = {

    renderDashboard,

  };
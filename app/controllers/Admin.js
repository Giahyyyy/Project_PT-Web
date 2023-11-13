// controllers/Admin.js
  const renderDashboard = (req, res) => {
      res.render('dashboard/index');
    };

  const renderChart = (req, res) => {
    res.render('chart/index');
  };

  const renderEmail = (req, res) => {
    res.render('email/index');
  };

  const renderForm = (req, res) => {
    res.render('form/index');
  };

  const renderTable = (req, res) => {
    res.render('table/index');
  };
  
  module.exports = {
    renderDashboard,
    renderChart,
    renderEmail,
    renderForm,
    renderTable,
  };
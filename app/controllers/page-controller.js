class PageController {
  showHomePage(req, res) {
    res.render('pages/home');
  };

  showNotFound(req, res) {
    res.render('errors/notFound', {
      layout: 'layouts/simple'
    });
  };
};

export default new PageController();
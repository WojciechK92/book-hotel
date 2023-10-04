class PageController {
  showHomePage(req, res) {
    const section1 = ['Usa', 'France', 'Zanzibar', 'Italy', 'United Kingdom', 'Spain'];

    res.render('pages/home', {
      title: 'Home page',
      section1,
    });
  };

  showNotFound(req, res) {
    res.render('errors/notFound', {
      layout: 'layouts/simple'
    });
  };
};

export default new PageController();
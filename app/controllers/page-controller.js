class PageController {
  showHomePage(req, res) {
    const summer = ['USA', 'France', 'Greece', 'Italy', 'UK', 'Spain'];
    const poland = ['Cracow', 'Gdansk', 'Warsaw', 'Wroclaw', 'Bieszczady', 'Bialystok'];

    res.render('pages/home', {
      title: 'Home page',
      summer,
      poland,
    });
  };

  showNotFound(req, res) {
    res.render('errors/notFound', {
      layout: 'layouts/auth'
    });
  };
};

export default new PageController();
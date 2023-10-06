class TripController {
  showAllInclusive(req, res) {
    res.render('pages/trips/trips');
  };
};

export default new TripController;
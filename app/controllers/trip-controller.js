class TripController {
  showAllInclusive(req, res) {
    const food = [
      {value: 'all-inclusive', label: 'All inclusive', checked: true}, 
      {value: 'HB', label: 'Breakfast and dinner', checked: false}, 
      {value: 'BB', label: 'Breakfast', checked: false}, 
      {value: 'FB', label: 'Three meals', checked: false}, 
    ];

    const popular = [
      {value: 'last-minute', label: 'Last minute', checked: false}, 
      {value: 'winter2023', label: 'Winter 2023', checked: false}, 
      {value: 'summer2024', label: 'Summer 2024', checked: false}, 
      {value: 'poland2024', label: 'Poland 2024', checked: true}, 
    ];
    
    const trips = [
      1, 2, 3
    ];
    
    res.render('pages/trips/trips', {
      food,
      popular,
      trips, 
    });
  };
};

export default new TripController;
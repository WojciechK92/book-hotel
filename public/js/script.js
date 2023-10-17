// closing the dropdown
const dropdownMenu = document.querySelector('.dropdown-menu');
const navbar = document.querySelector('.navbar');

if (dropdownMenu) {
  navbar.addEventListener("mouseleave", function(){
    dropdownMenu.classList.remove('show');
  });
};

// trip booking
const linkButtons = document.querySelectorAll('.booking');

if (linkButtons) {

  const bookTrip = async (e) => {
    e.preventDefault();

    const option = e.target.dataset.option;
    const tripId = e.target.dataset.tripId;

    try {
      const res = await fetch('/trips/bookTrip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }, 
        body: JSON.stringify({
          tripId,
          option,
        }), 
      }); 

      location.reload();
      
    } catch(e) {
      console.log(e);
    };
  };

  linkButtons.forEach(link => link.addEventListener('click', bookTrip));
};
// pagination - change page
const paginationLinks = document.querySelectorAll('.page-link');
const previousPageLink = document.querySelector('#previous-page');
const nextPageLink = document.querySelector('#next-page');
const pagination = document.querySelector('.pagination'); 

const redirectToPage = (searchParams) => {
  const url = window.location.origin + window.location.pathname + '?' + searchParams.toString();
  window.location.href = url; 
};

if (pagination) {
  
  const clickHandler = (e) => {
    e.preventDefault();
    
    const selectedLink = e.target.closest('a');
    const selectedPage = selectedLink.dataset.page;
  
    
    if (selectedPage === 'previous') {
      searchParams.set('page', currentPage - 1)
      redirectToPage(searchParams);
    } else if (selectedPage === 'next') {
      searchParams.set('page', currentPage + 1);
      redirectToPage(searchParams);
    } else {
      searchParams.set('page', selectedPage);
      redirectToPage(searchParams);
    };
  };
  
  const { searchParams } = new URL(window.location);    
  const currentPage = Number(searchParams.get('page') || 1);
  const pagesAmount = +pagination.dataset.pagesAmount;
  
  if (currentPage === 1) previousPageLink.style.visibility = 'hidden'; 
  if ((currentPage === pagesAmount) || (pagesAmount === 0)) nextPageLink.style.visibility = 'hidden';

  paginationLinks.forEach(link => {
    link.addEventListener('click', clickHandler);
  });
};

// filtration - toggle filtration form
const filtrationForm = document.querySelector('#filtration-form');
const filtrationButton = document.querySelector('#filtration-button');

if (filtrationButton) {
  filtrationButton.addEventListener('click', () => {
    filtrationForm.classList.toggle('d-none');
  });
};

// dropdown in menu
const dropdownMenu = document.querySelector('.dropdown-menu');
const navbar = document.querySelector('.navbar');

if (dropdownMenu) {
  navbar.addEventListener("mouseleave", function(){
    dropdownMenu.classList.remove('show');
  });
};

// trip booking
const linkButtons = document.querySelectorAll('.booking');

if (linkButtons.length) {
  const bookTrip = async (e) => {
    e.preventDefault();
    const option = e.target.dataset.option;
    const tripId = e.target.dataset.tripId;

    try {
      await fetch('/trips/bookTrip', {
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
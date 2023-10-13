// pagination - change page
const paginationLinks = document.querySelectorAll('.page-link');
const previousPageLink = document.querySelector('#previous-page');
const nextPageLink = document.querySelector('#next-page');

const redirectToPage = (searchParams) => {
  const url = window.location.origin + window.location.pathname + '?' + searchParams.toString();
  window.location.href = url; 
};

if (document.querySelector('.pagination')) {
  
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
  const pagesAmount = paginationLinks.length - 2;
  
  if (currentPage === 1) previousPageLink.style.visibility = 'hidden'; 
  if ((currentPage === pagesAmount) || (pagesAmount === 0)) nextPageLink.style.visibility = 'hidden';

  paginationLinks.forEach(link => {
    link.addEventListener('click', clickHandler);
  });
};

// filtration - toggle filtration form
const filtrationForm = document.querySelector('#filtration-form');
const filtrationButton = document.querySelector('#filtration-button');

filtrationButton.addEventListener('click', () => {
  filtrationForm.classList.toggle('d-none');
});
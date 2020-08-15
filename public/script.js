if (!localStorage.getItem('userId')) {
  localStorage.setItem('userId', String(Math.random()));
}

const userId = localStorage.getItem('userId');

const handleClick = (event) => {
  console.log(event)
}


const body = (event) => {
  const pageX = Math.round(event.pageX);
  const pageY = Math.round(event.pageY);
  const path = event.path.find(item => item.dataset.trackingid !== undefined); 
  const theItemThatGotClicked = event.target;
  const howLongUserOnPage = Math.round(event.timestamp);
  const userId = localStorage.getItem('userId');
  const url = '/clicks';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      user: userID,
    }),
  });
}



window.addEventListener('click', handleClick)
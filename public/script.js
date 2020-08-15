if (!localStorage.getItem('userId')) {
  localStorage.setItem('userId', String(Math.random()));
}

const userId = localStorage.getItem('userId');


const handleClick = async(event) => {
  console.log(event);
  const pageX = Math.round(event.pageX);
  const pageY = Math.round(event.pageY);
  const path = event.path.find(item => item.dataset.trackingid !== undefined); 
  const trackingid = path.dataset.trackingid;
  console.log(path.dataset.trackingid);
  const theItemThatGotClicked = event.target.outerHTML;
  console.log(theItemThatGotClicked);
  const howLongUserOnPage = Math.round(event.timeStamp);
  console.log(event.timeStamp);
  const userId = localStorage.getItem('userId');
  
  const url = '/clicks';
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      userId,
      pageX,
      pageY,
      path: trackingid,
      theItemThatGotClicked,
      howLongUserOnPage
    }),
  });
}


window.addEventListener('click', handleClick)
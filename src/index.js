let addToy = false;
const toysUrl = "http://localhost:3000/toys"
const toyCollectionDiv = document.getElementById('toy-collection')
const toyCards = document.getElementsByClassName('card')
const likesButtons = document.getElementsByClassName("like-btn")
// const toyCards = document.getElementsByClassName('card')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const newToyForm = document.querySelector('form.add-toy-form');
  

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  newToyForm.addEventListener('submit', function submitNewToy(event){
    event.preventDefault();
    const submittedData = event.target
    const submittedName = submittedData[0].value
    const submittedImage = submittedData[1].value
    const sendData = { 
      "name": submittedName,
      "image": submittedImage
    }
    fetch(toysUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(sendData)
    })
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      addToyToDom(data);
    })
    .catch(function(error){
      alert(error.message);
    })
  });

  return fetch(toysUrl)
  .then(function(response){
    return response.json();
  })
  .then(function getToys(toyObjects){
    for (const element of toyObjects) {
      addToyToDom(element);
    }
  })
  .catch(function(error){
    alert(error.message);
  })
  // Why did this approach fail?
  // function clickLikes(){
  //   for (const likeButton of LikesButtons) {
  //       likeButton.addEventListener('click', function(event){
  //         console.log(event)l
  //       })
  //   }
  // }
});

function addToyToDom(toyObject){
  const newToyDiv = document.createElement('div');
  newToyDiv.className = "card";
  newToyDiv.id = toyObject.id
  toyCollectionDiv.appendChild(newToyDiv);
  
  const toyName = document.createElement('h2')
  toyName.innerHTML = toyObject.name
  newToyDiv.appendChild(toyName);
  
  const toyImage = document.createElement('img')
  toyImage.src = toyObject.image
  toyImage.className = "toy-avatar"
  newToyDiv.appendChild(toyImage);
  
  const likesTally = document.createElement('p')
  likesTally.innerHTML = "0 Likes";
  newToyDiv.appendChild(likesTally)

  const likesButton = document.createElement('button')
  likesButton.className = "like-btn"
  likesButton.id = toyObject.id
  likesButton.innerHTML = "Like <3"
  newToyDiv.appendChild(likesButton)

  clickLikesEventListener(likesButton);
}

function clickLikesEventListener(likesButton) {
  likesButton.addEventListener('click', function(event){
    const toyId = event.target.id;
    const currentLikes = document.getElementById(`${toyId}`).querySelector('p')
    let likesNumber = parseInt(currentLikes.innerText)
    likesNumber++
    updateLikes(toyId, likesNumber)
  })
}
function updateLikes(toyId, likesNumber){
  return fetch(`${toysUrl}/${toyId}`, {
    method: "PATCH",
    headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    body: JSON.stringify({
      "likes": likesNumber
    })    
  })
  .then(function(response){
    return response.json()
  })
  .then(function(json){
    const updatedLikesNumber = json.likes;
    // ask about this
    const currentLikes = document.getElementById(`${json.id}`).querySelector('p')
    currentLikes.innerText = `${updatedLikesNumber} Likes`
  })
  .catch(function(error){
    alert(error.message);
  })
}
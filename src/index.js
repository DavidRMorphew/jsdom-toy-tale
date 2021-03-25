let addToy = false;

const toyCollectionDiv = document.getElementById('toy-collection')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const getToysUrl = "http://localhost:3000/toys"
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
    const submittedData = event.target
    const submittedName = submittedData[0].value
    const submittedImage = submittedData[1].value
    const sendData = { 
      "name": submittedName,
      "image": submittedImage
    }
    fetch(getToysUrl, {
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
  });
  return fetch(getToysUrl)
  .then(function(response){
    return response.json();
  })
  .then(function getToys(toyObjects){
    for (const element of toyObjects) {
      
      const newToyDiv = document.createElement('div');
      newToyDiv.className = "card";
      newToyDiv.id = element.id
      toyCollectionDiv.appendChild(newToyDiv);
      
      const toyName = document.createElement('h2')
      toyName.innerHTML = element.name
      newToyDiv.appendChild(toyName);
      
      const toyImage = document.createElement('img')
      toyImage.src = element.image
      toyImage.className = "toy-avatar"
      newToyDiv.appendChild(toyImage);
      
      const likesTally = document.createElement('p')
      likesTally.innerHTML = "0 Likes";
      newToyDiv.appendChild(likesTally)

      const likesButton = document.createElement('button')
      likesButton.className = "like-btn"
      likesButton.innerHTML = "Like <3"
      newToyDiv.appendChild(likesButton)
    }
  })
});

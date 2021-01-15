let addToy = false;
let newToyForm = document.querySelector("body div.container form")
console.log(newToyForm)
const toyCollection = document.querySelector("#toy-collection")

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys") 
    .then(res => res.json())
    .then ((toysArray) => {
      toysArray.forEach(toy => {
        let toyDiv = document.createElement("div")
        let toyH2 = document.createElement("h2")
        let toyImg = document.createElement("img")
        let toyP = document.createElement("p")
        let toyButton = document.createElement("button")
        toyDiv.className = "card"
        toyH2.textContent = toy.name
        toyImg.src = toy.image
        toyImg.className = "toy-avatar"
        toyP.textContent = `${toy.likes} Likes`
        toyButton.className = "like-btn"
        toyButton.textContent = "Like"

        toyButton.addEventListener("click", () => {
          toy.likes += 1
          toyP.textContent = `${toy.likes} Likes`

          fetch(`http://localhost:3000/toys/${toy.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              "likes": toy.likes
            })
          })
            .then(res => res.json())
            .then((toy) => {
              toy.likes
            })
        })

        toyDiv.append(toyH2, toyImg, toyP, toyButton)

        toyCollection.append(toyDiv)
      });
    })
})

newToyForm.addEventListener("submit", (e) => {
  let newToyName = e.target.name.value
  let newToyImage = e.target.image.value

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": newToyName,
      "image": newToyImage,
      "likes": 0
    })
  })
    .then(res => res.json())
    .then((newToy) => {
      addNewToy(newToy)
    })

})

let addNewToy = (newToyObj) => {
  let newToyDiv = document.createElement("div");
  let newToyH2 = document.createElement("H2");
  let newToyImg = document.createElement("img");
  let newToyP = document.createElement("p")
  let newToyButton = document.createElement("button")
  
  newToyDiv.className = "card"
  newToyImg.className = "toy-avatar"
  newToyButton.className = "like-btn"
  newToyButton.textContent = "Like"
  newToyH2.textContent = newToyObj.name
  newToyImg.src = newToyObj.image
  newToyP.textContent = `${newToyObj.likes} Likes`

  newToyDiv.append(newToyH2, newToyImg, newToyP, newToyButton)
  toyCollection.append(newToyDiv)

}
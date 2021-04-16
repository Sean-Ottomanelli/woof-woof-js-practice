let dogBarLoc = document.querySelector("div#dog-bar")
let displayedDog = {}
let dogImageLoc = document.querySelector("#dog-image")
let dogNameLoc = document.querySelector("#dog-name")
let dogButtonLoc = document.querySelector("#dog-button")

fetch("http://localhost:3000/pups")
.then(res => res.json())
.then(dogArrays => {
    console.log(dogArrays)
    dogArrays.forEach((dogObj)=>{
        console.log(dogObj.name)
        let newDogNameSpan = document.createElement("span")
        newDogNameSpan.innerText = dogObj.name
        dogBarLoc.append(newDogNameSpan)

        newDogNameSpan.addEventListener("click", () => {
            console.log("You cliked me. My name is " + dogObj.name)
            displayedDog = dogObj
            dogImageLoc.src = displayedDog.image
            dogNameLoc.innerText = displayedDog.name
            dogButtonLoc.innerText = displayedDog.isGoodDog
        })
    })
})

dogButtonLoc.addEventListener("click",()=>{
    console.log("Am I good?")
    if (displayedDog.isGoodDog === true){
        dogButtonLoc.innerText = false
        displayedDog.isGoodDog = false
    } else {
        dogButtonLoc.innerText = true
        displayedDog.isGoodDog = true
    }
    fetch(`http://localhost:3000/pups/${displayedDog.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            isGoodDog: displayedDog.isGoodDog
        }),
    })
    .then((r) => r.json())
    .then((pupObj) => console.log(pupObj));
})




{/* <img src=dog_image_url>
<h2>Mr. Bonkers</h2>
<button>Good Dog!</button> */}
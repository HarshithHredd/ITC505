let currentLevel = 0;

const levels = [ 
    //0
    {
        text: "You wake up in a dark cell. You must escape!",
        choices: ["Try to pick the lock", "Search for a guard to bribe"],
        consequences: {
            "Try to pick the lock": 1, // Go to level 1
            "Search for a guard to bribe": 2 // Go to level 2 caught
        },
        image: "https://media.istockphoto.com/id/891326652/photo/man-in-prison.jpg?s=612x612&w=0&k=20&c=NYb8S4FLlft9p_k-FOuo9NiwRzo-hN4PhFfuVmIJf8o="
    },
    //1
    {
        text: "You manage to escape your cell. You find yourself in a dimly lit corridor.",
        choices: ["Sneak past a sleeping guard", "Confront a patrolling guard"],
        consequences: {
            "Sneak past a sleeping guard": 3, // Go to level 3
            "Confront a patrolling guard": 2 // Go to level 2 caught
        },
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWHymG8bYkjtyQs7xuuCEm1ALm4oL6AWgVn-0KKsLdrw&s"
    },
    //2 Caught
    {
        text: "The guard denies it as he is an honest man. You are put in Isolation for 2 weeks.",
        choices: [],
        consequences: {
        },
        endText:"Game Ended",
        image: "https://cdn.psychologytoday.com/sites/default/files/styles/image-article_inline_full/public/field_blog_entry_images/2018-06/donald_tong_pexels.jpg?itok=UMh5Z_Is"
    },
    //3
    {
        text: "You have found yourself in a pickle.There are two ways you can go. Left or Right?",
        choices: ["Left", "Right"],
        consequences: {
            "Left": 4, // Go to level 4 caught
            "Right": 5 // Go to level 5
        },
        image: "https://preview.redd.it/which-way-do-you-go-left-or-right-choose-carefully-v0-tzn5v5zm0eba1.jpg?width=640&crop=smart&auto=webp&s=4ecb4939a4b55b8e5e8ffbee90c10d27b881dec6"
    },
    //4 caught
    {
        text: "You have ran into a guard and has shot you in the leg",
        choices: [],
        consequences: {
        },
        image: "https://preview.redd.it/which-way-do-you-go-left-or-right-choose-carefully-v0-tzn5v5zm0eba1.jpg?width=640&crop=smart&auto=webp&s=4ecb4939a4b55b8e5e8ffbee90c10d27b881dec6",
        endText:"Game Ended",
    },
    //5 kitchen or block 2
    {
        text: "You have come outside your prison block. You can go to the outer wall through the kitchen block or Block 2",
        choices: ["kitchen", "block 2"],
        consequences: {
            "kitchen": 6, // Go to level 6 
            "block 2": 7 // Go to level 7 caught
        },
        image: "https://www.gutenberg.org/files/48809/48809-h/images/kilby-3.jpg"
    },
    //6
    {
        text: "The Kitchen is Empty. You are safe... for now atleast. You go through the exit and find a guard there. He was the only guard who was friends with you. You also know he is an honest man and would not let you leave. Do you ask him nicely or do you kill him?",
        choices: ["Ask the Guard", "kill him"],
        consequences: {
            "Ask the Guard": 8, // Go to level 3
            "kill him": 9 // Go to level 4
        },
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGdZG8gWMskhzDsy_Z2HZ6qqrAcSqKapOUl-dWqCcUKw&s",
    },
    //7
    {
        text: "You go into block 2. You don't see any guards so you go further. There you see a group of guards having dinner and they see you too. There go your hopes of escaping prison ever again.",
        choices: [],
        consequences: {
        },
        image: "https://bloximages.newyork1.vip.townnews.com/stltoday.com/content/tncms/assets/v3/editorial/9/fa/9fa4dc8c-5228-5db9-b73f-91995fe87177/638fe6477b549.image.jpg?resize=1200%2C739",
        endText:"Game Ended",
    },
    //8
    {
        text: "The guard tries to talk some sense into you. You are desperate and beg for it. He thinks for a minute. Then he handcuffs you and takes you back to your cell without alerting anybody.",
        choices: [],
        consequences: {
            
        },
        image: "data:image/jpeg;base64,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",
        endText:"Game Ended"
    },
    {
        //9
        text: "You kill the guard with your bare hands. You have blood all over you body. You are in guilt. But you tell yourself that you had no other way and you had to do it. You promise him while dying that you will take care of his family. You go ahead and find a fence and a tunnel. Which one do you pick?",
        choices: ["Tunnel","Fenced Wall"],
        consequences: {
            "Fenced Wall":10,
            "Tunnel":11,
        },
        image:"https://cdn.cnn.com/cnnnext/dam/assets/170326050105-mexico-prison-break-tunnel-super-169.jpg",
    },
    //10
    {
        text: "You try to climb the fence. It feels too high at this point. It keeps on coming. It is almost morning. The Guard duty is changing. The entire Prison sees you climbing the wall. You get caught You think this is because you killed the guard and are locked in prison forever.",
        choices: [],
        consequences: {
            
        },
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR356xi-S7lWTU3c0M0ZAvNtbBk5q73INnoX6C3Y1sd4g&s",
        endText:"Game Ended"

    },
    //11
    {
        text: "You go Inside the Tunnel. You only have another 20 minutes till its sunrise. The guards have been alerted. Now you come out the tunnel. There is a highway and a small road leading to a village.",
        choices: ["Highway","Village"],
        consequences: {
            "Highway":12,
            "Village":13,
        },
        image:"https://img.freepik.com/free-photo/asphalt-road-with-yellow-lines-worthington-glacier-alaska_181624-47870.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1711929600&semt=ais",
    },
    //12
    {
        text: "You go the Highway Route. You walk through the Highway for 11 kilometers. It is morning now. You are in your prison clothes. A civillian sees you and calls the police. You are caught by the police",
        choices: [],
        consequences: {
            
        },
        image:"https://akm-img-a-in.tosshub.com/indiatoday/images/media_bank/202309/danelo-cavalcante-caught-145449503-16x9.jpg?VersionId=xRuwHVK7DYELpQpBBkO22k5L4xgZm2nU&size=690:388",
        endText:"Game Ended"

    },
    //13
    {
        text:"You walk another 4 kilometers along the village road. There you see an old farmer. He sees you in your prison clothes. What do you do? ",
        choices: ["Kill Him","Tell him your story"],
        consequences: {
            "Kill Him":14,
            "Tell him your story":15,
        },
        image:"https://static.thereisadayforthat.com/images/935x475c/farmer-657333_1920.jpg"
    },
    //14
    {
        text:"You try to kill him. But he overpowers you with his tools. You still try to harm him. He kills you by hitting you with a shovel",
        choices: [],
        consequences: {
            
        },
        image:"https://images.pond5.com/blood-sink-close-crime-scene-footage-147470107_iconl.jpeg",
        endText:"Game Ended"
    },
    //15
    {
        text:"He understands your story and how you were falsely convicted. He gives you shelter and a job in his farm. You live there for another 2 years and the police drop the search for you. ",
        choices:[],
        consequences:{},
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGVBPG4Rv8LcCJD5DT0xtes0Ik7zCBWVjuEilA-BudPg&s",
        endText:"You have escaped Prison. Game Ended",
        addendum:"The Game loop was the most difficult thing I have faced during the game. I had to make it dynamic and not static.\n The game had to change according to the levels object I have.\n Deciding on the strucutre of the object was also an important thing. \n I had to match the consequences with the choices for the next level.\n I was able to do it using optional parameters for the object which is just normal parameters with nullable value in Javascript.\n The Theme was also inspired from Prison Break. The Challenge there was to stop the game from taking any input when it has finished. This was also done using optional parameters.\n Mapping choices to consequences was also challenging and I used a Dictionary to map the level value and the choice string"

    }

    // Add more levels here
];

function initLevel(levelIndex) {
    const level = levels[levelIndex];
    document.getElementById("story").textContent = level.text;
    document.getElementById("choices").innerHTML = "";
    document.getElementById("endText").textContent=level.endText;
    document.getElementById("addendum").textContent=level.addendum;
    level.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.addEventListener("click", function() {
            makeChoice(choice);
        });
        document.getElementById("choices").appendChild(button);
    });
    document.getElementById("level-image").src = level.image;
}

function makeChoice(choice) {
    const level = levels[currentLevel];
    const nextLevelIndex = level.consequences[choice];
    if (nextLevelIndex!==undefined) {
        currentLevel = nextLevelIndex;
        initLevel(currentLevel);
    } else {
        document.getElementById("story").textContent = "Invalid choice!";
    }
}

initLevel(currentLevel);

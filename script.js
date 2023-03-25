//doubt- temp literal(90), event info(86)
//initial references (JS VARIABLES)
const container = document.querySelector(".container");
const result = document.querySelector(".result");
const startButton = document.querySelector("#start");
const wrapper = document.querySelector(".wrapper");

const colorPart = document.querySelectorAll(".color-part");
const countValue = document.querySelector(".cnt");

//mapping new colors to old colors(JS OBJECTS WITH KEY-VALUE AS OBJECTS)
const colors = {
    color1: {
        current: "#068e06",
        new: "#11e711",
    },
    color2: {
        current: "#950303",
        new: "#fd2a2a",
    },
    color3: {
        current: "#01018a",
        new: "#2062fc",
    },
    color4: {
        current: "#919102",
        new: "#fafa18",
    },

};
//only initial ref are kept constant and all arrays, variables are made using let 
let randomColors = []; //this array stored objects with old,new as keys
let pathGenerator = false;
let count, clickCount = 0;
//at start of game all values are kept 0 or empty
startButton.addEventListener("click", () => {
    count = 0;
    clickCount = 0;
    randomColors = [];
    pathGenerator = false;
    wrapper.classList.remove("hide");
    container.classList.add("hide");
    pathGenerate();
});
//to decide sequence after game starts
const pathGenerate = () => {
    randomColors.push(generateRandomValue(colors));
    count = randomColors.length;
    pathGenerator = true;
    pathDecide(count);
};

//function to get randoom value from object colors
const generateRandomValue = (obj) => {
    let arr = Object.keys(obj);  //this method stores all keys in an array
    return arr[Math.floor(Math.random() * arr.length)];  //and we extract a random index between 0 to keys length by using random and then return arr[index]
    //so basically from object containing objects we are returning any one object like color1,color2
};


//function to light up all colors in sequence
const pathDecide = async (count) => {
    countValue.innerHTML = `${count}`;
    for (let i of randomColors) {
        //pehle div extract kro jiska color badalna hai
        let curColor = document.querySelector(`.${i}`);    //har js object ko class name me convert krne ${} lgate hai
        //usko new color denge kuch time ke liye fir off krdenge fir delay denge taki next color aur current color ke bich gap rhe blink hone me
        await delay(500);
        curColor.style.backgroundColor = `${colors[i]["new"]}`;
        await delay(600);   //await is used so we wait for delay fun execution
        curColor.style.backgroundColor = `${colors[i]["current"]}`;
        await delay(500);
    }

    pathGenerator = false;
};

async function delay(time) {     //this returns a resolved promise after time secs and hence we are sing await here
    return await new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

colorPart.forEach((element) => {

    element.addEventListener("click", async (e) => {
        if (pathGenerator) return false;
        console.log(e.target);  //when an element is clicked, we can find its element in e.target where e is object having info abput click
        if (e.target.classList[0] == randomColors[clickCount]) {     //agar clicked color ka object equal hai randomcolor ke object se toh 

            //3 kaam- blink krwana shi color ko, clickcnt bdhana, check krna agar saare sahi colors click hogye toh firse NEXT LEVEL

            e.target.style.backgroundColor = `${colors[randomColors[clickCount]]["new"]
                }`;

            await delay(500);

            e.target.style.backgroundColor = `${colors[randomColors[clickCount]]["current"]
                }`;


            clickCount += 1;

            if (clickCount == count) {
                clickCount = 0;   //that means user has clicked all in right sequence so set it to 0
                pathGenerate(); //take user to next level
            }
        } else {
            lose();
        }

    });
});

const lose = () => {
    result.innerHTML = `<span> Your Score: </span> ${count}`;
    result.classList.remove("hide");
    container.classList.remove("hide");
    wrapper.classList.add("hide");
    startButton.innerText = "Play Again";



};







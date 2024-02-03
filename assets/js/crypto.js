var cryptoList = document.querySelector("#crypto");
var purchasedCoins = {}; 
var coinData;
var coinURL  = "https://api.coinranking.com/v2/coins?limit=8&timePeriod=30d";
var wallet = [];

function addWallet(coin){

    if ((wallet.length) === 0){
        // wallet is empty so add coin to wallet
        wallet.push(coin);
        console.log("this inside push");
    }
    
        //if wallet is not empty check to see if coin is in wall
        // for (let j = 0; j < wallet.length; j++){
        //     if (wallet){
        //         //increament the quantity of the coins
        //         console.log("this section should fire  because coin exists in wallet");
        //         break;
        //     }}
            var isCoinInArray = wallet.some(function(obj) {
                return Object.values(obj).includes(coin.name);
              });

              if (isCoinInArray) {
                console.log("coins is in  the array");
              }
              else {
                console.log("coins is not!!!!!!! in the array");
              }

            wallet.push(coin);
            //     console.log(wallet);


            // for (let i = 0; i < wallet.length; i++){
            // if (coin.name wallet[i].name){
            //     // add coint to wallet
            //     wallet.push(coin);
                console.log(wallet);
            //     break;
            // }}
            
        

    }

//adding sections to our the crypto page and displays data.
function addSections (coins){

    for (let i = 0; i < coins.length; i++){
      
        var line = document.createElement("section");
        line.classList.add("container", "flex");
        cryptoList.append(line);
        line.addEventListener("click",function(){
            var coinName = coins[i];
            addWallet(coinName);
        })

        var iconCont = document.createElement("section");
        iconCont.classList.add("container", "flex");
        var iconImg = document.createElement("img");
        iconImg.src = coins[i].iconUrl; 
        iconImg.classList.add("w-[2vw]");
        iconCont.append(iconImg);
        line.append(iconCont); 

        var listSymbol = document.createElement("section");
        listSymbol.classList.add("container", "flex", "items-center", "text-lg", "font-bold");
        listSymbol.textContent = coins[i].symbol;
        line.append(listSymbol);
        
        var listName = document.createElement("section");
        listName.classList.add("container", "flex", "items-center", "text-lg", "font-bold");
        listName.textContent = coins[i].name;
        line.append(listName);

        var listPrice = document.createElement("section");
        listPrice.classList.add("container", "flex", "items-center", "text-md");
        listPrice.textContent = "$" + parseFloat(coins[i].price).toFixed(2);
        line.append(listPrice);
    
        var listGraph = document.createElement("section");
        listGraph.classList.add("container", "flex");
        listGraph.textContent = "";
        line.append(listGraph);

        var canvas = document.createElement("canvas");
        canvas.classList.add("bg-white-100")
        canvas.id = coins[i].name;
        listGraph.append(canvas);
        
        new Chart(coins[i].name, {
            type: "line",
            data: {
                labels: coins[i].sparkline.map((_, index) => (index + 1)),
                datasets: [{
                    backgroundColor: "rgba(0, 0, 255, 1.0)",
                    borderColor: "rgba(0, 0, 255, 0.1)",
                    data: coins[i].sparkline
                }]
            }
        });

        var buttonCont = document.createElement("section");
        buttonCont.classList.add("container", "flex", "items-center", "ml-[4vw]");
        var button = document.createElement("button");
        button.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "w-[10vw]", "h-[5vh]");
        button.textContent = "Add To Wallet";
        buttonCont.append(button);
        line.append(buttonCont);
    }
}


// displays list of available coins to screen
function addCoins(coins){
    for(let i =0; i<coins.length; i++){

        var price = parseFloat(coins[i].price);

        var listItem = document.createElement('li');
        listItem.value = i + 1; 
        var coinInfo = document.createTextNode(coins[i].name + ' $ ' + price.toFixed(2) +'       ');
        //adds an event listener to every coin ---
        listItem.addEventListener("click", function(){
            var coinName = coins[i].name;
            console.log(coinName);
        })
        listItem.append(coinInfo);
        cryptoList.append(listItem);
    }}

async function getCoinsList(){
    try
    {
        var response = await fetch(coinURL);

        if (!response.ok)
        {
            throw new Error("Error! Status:${repsonse.status}");
        }

        var data = await response.json();
        
            coinData = data.data.coins;
            addSections(data.data.coins);
        ;
              
    } catch (error)

    {
        console.log("Fetching error:", error);
    }
}

getCoinsList();
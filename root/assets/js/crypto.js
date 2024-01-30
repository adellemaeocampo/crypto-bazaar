var cryptoList = document.querySelector("#crypto");
var purchasedCoins = {}; 
var coinData;
var coinURL  = "https://api.coinranking.com/v2/coins?limit=3&timePeriod=30d";
var wallet;

console.log('this is the first console call');


//function adding sections to the page
//takes in list of coins


//adding sections to our the crypto page and displays data.
function addSections (coins){
    console.log('first console call inside add section tabe before for loops');
    console.log(coins[1].name);
    console.log(coins[1].name);


    for (let i = 0; i < coins.length; i++){
        console.log(coins[0].name);
        console.log(coins[1].name);

        var line = document.createElement("section");
        line.classList.add("container", "flex");
        cryptoList.append(line);
        
        var listSymbol = document.createElement("section");
        listSymbol.classList.add("container", "flex", "bg-cyan-100");
        listSymbol.textContent = coins[i].symbol;
        line.append(listSymbol);


        var listName = document.createElement("section");
        listName.classList.add("container", "flex", "bg-red-100");
        listName.textContent = coins[i].name;
        line.append(listName);


        var listPrice = document.createElement("section");
        listPrice.classList.add("container", "flex", "bg-yellow-100");
        listPrice.textContent = "$" + parseFloat(coins[i].price).toFixed(2);
        line.append(listPrice);
        console.log("The add sections tab was successful."); 


        var listGraph = document.createElement("section");
        listGraph.classList.add("container", "flex", "bg-green-100");
        listGraph.textContent = "Grath";
        line.append(listGraph);

    }


}



// need to create a function that adds cooins to a list

function addWallet(coin){


    
    if (typeof wallet === undefined){
        // wallet is empty so add coin to wallet
    }
    else 
        //if wallet is not empty check to see if coin is in wall
        for (let j = 0; j < wallet.length; j++){
            if (coin.name === wallet[i].name){
                //increament the quantity of the coins
            }else{
                // add coint to wallet
            }
            
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
            // console.log();
            // addCoins(coinData);
            addSections(data.data.coins);
        ;
              
    }catch (error)
    {
        console.log("Fetching error:", error);
    }
    
}

getCoinsList();



// console.log(coinData[1].name);



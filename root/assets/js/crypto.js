var cryptoList = document.querySelector("#crypto-list");
var purchasedCoins = {}; 
var coinData;
var coinURL  = "https://api.coinranking.com/v2/coins?limit=3&timePeriod=30d";
var wallet;

console.log(typeof wallet);


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
            addCoins(coinData);
        ;
              
    }catch (error)
    {
        console.log("Fetching error:", error);
    }
    
}

getCoinsList();



// console.log(coinData[1].name);



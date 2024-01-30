var cryptoList = document.querySelector("#crypto-list");
var coinData;
var coinURL  = "https://api.coinranking.com/v2/coins?limit=3&timePeriod=30d";

function addCoins(coins){
    for(let i =0; i<coins.length; i++){

        var price = parseFloat(coins[i].price);

        var listItem = document.createElement('li');
        listItem.value = i + 1; 
        var coinInfo = document.createTextNode(coins[i].name + ' $ ' + price.toFixed(2) +'       ');
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



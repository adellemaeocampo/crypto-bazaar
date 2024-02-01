var cryptoList = document.querySelector("#crypto");
var purchasedCoins = {}; 
var coinData;
var coinURL  = "https://api.coinranking.com/v2/coins?limit=3&timePeriod=30d";
var wallet = [];

console.log('this is the first console call');


// Adds coins to a wallet and checks for duplicate coins
// function addwallet (coin) {

// console.log(coin.name + coin.price);

// }




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

              if (isCoinInArray){
                console.log("coins is in  the array");
              }
              else{
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
            // addwallet(coinName);
            addWallet(coinName);

        })
        
        
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


        var listGraph = document.createElement("section");
        listGraph.classList.add("container", "flex", "bg-green-100");
        listGraph.textContent = "Graph";
        line.append(listGraph);

        var canvas = document.createElement("canvas");
        canvas.id = coins[i].name;
        listGraph.append(canvas);
        

        new Chart(coins[i].name, {
            type: "line",
            data: {
              labels: coins[i].sparkline.map((_, index) => index + 1),
              datasets: [{
                backgroundColor:"rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: coins[i].sparkline
              }]
            },
            
          });

    }


}



// need to create a function that adds cooins to a list

// function addWallet(coin){


    
//     if (typeof wallet === undefined){
//         // wallet is empty so add coin to wallet
//     }
//     else 
//         //if wallet is not empty check to see if coin is in wall
//         for (let j = 0; j < wallet.length; j++){
//             if (coin.name === wallet[i].name){
//                 //increament the quantity of the coins
//             }else{
//                 // add coint to wallet
//             }
            
//         }

//     }




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



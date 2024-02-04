var cryptoList = document.querySelector("#crypto");
var walletid = document.querySelector("#wallet");
var purchasedCoins = {}; 
var coinData;
var coinURL  = "https://api.coinranking.com/v2/coins?limit=8&timePeriod=30d";



//print wallet found in local storage to wallet
function printTowallet (coins){

    
      
        var line = document.createElement("section");
        line.classList.add("container", "flex");
        walletid.append(line);
       
        var iconCont = document.createElement("section");
        iconCont.classList.add("container", "flex");
        var iconImg = document.createElement("img");
        iconImg.src = coins.iconUrl; 
        iconImg.classList.add("w-[2vw]");
        iconCont.append(iconImg);
        line.append(iconCont); 

        var listSymbol = document.createElement("section");
        listSymbol.classList.add("container", "flex", "items-center", "text-lg", "font-bold");
        listSymbol.textContent = coins.symbol;
        line.append(listSymbol);
        
        var listName = document.createElement("section");
        listName.classList.add("container", "flex", "items-center", "text-lg", "font-bold");
        listName.textContent = coins.name;
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
        canvas.id = coins.name;
        listGraph.append(canvas);
        
        new Chart(coins.name, {
            type: "line",
            data: {
                labels: coins[i].sparkline.map((_, index) => (index + 1)),
                datasets: [{
                    backgroundColor: "rgba(0, 0, 255, 1.0)",
                    borderColor: "rgba(0, 0, 255, 0.1)",
                    data: coins.sparkline
                }]
            }
        });

        var buttonCont = document.createElement("section");
        buttonCont.classList.add("container", "flex", "items-center", "ml-[4vw]");
        var button = document.createElement("button");
        button.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "w-[10vw]", "h-[5vh]");
        button.textContent = "Add To Wallet";
        button.addEventListener("click", function(){
            var coin = coins;
            

        });
        buttonCont.append(button);
        line.append(buttonCont);
    
}












function addCoinsWallet (coins)
{
var matchfound = false;

if (wallet.coins.length === 0){
  
    coins.quantity ="1";
    wallet.coins.push(coins);
    console.log("wallet is empty so we just addaed a coin  " + coins);


    
    
    
}else{
    for( let i =0; i < wallet.coins.length; i++){
        if (wallet.coins[i].name === coins.name){
            console.log("we have just increamented our coin");
            wallet.coins[i].quantity++;
            matchfound = true;
            break;
        }}
        
        if(!matchfound){

            console.log("wallet is not empty and coin does not already exist in the wallet, so we are adding it to the wallet");
            coins.quantity ="1";

            wallet.coins.push(coins);
            
            
        }
    }
}



    

function addSections (coins){

    for (let i = 0; i < coins.length; i++){
      
        var line = document.createElement("section");
        line.classList.add("container", "flex");
        cryptoList.append(line);
        

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
        button.addEventListener("click", function(){
            var coin = coins[i];
            console.log(coin);
            addCoinsWallet(coin);
            // printTowallet(coin);

            // localStorage.setItem('wallet', JSON.stringify(wallet));
            wallet.saveCoin();
            

        });
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
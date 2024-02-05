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
        
    }else{
        for( let i =0; i < wallet.coins.length; i++){
            if (wallet.coins[i].name === coins.name){
                // console.log("we have just incremented our coin");
                wallet.coins[i].quantity++;
                matchfound = true;
                break;
            }
        }
            
        if(!matchfound){

            // console.log("wallet is not empty and coin does not already exist in the wallet, so we are adding it to the wallet");
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

            wallet.loadCoins();
            addCoinsWallet(coin);

            if (wallet.saveCoins()) {
                // display alert to confirm before adding coin to the wallet
                function walletAlert() {
                var alert = document.createElement("div");
                alert.innerHTML = `<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert" style="width: 500px;">
                    <strong class="font-bold">Added To Wallet!</strong>
                    <span class="block sm:inline">The item has been added to your wallet.</span>
                    <span class="absolute top-0 bottom-0 right-0 px-4 py-3" role="button" id="closeButton">
                        <svg class="fill-current h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                    </span>
                    </div>`;
        
                alert.style.position = "fixed";
                alert.style.top = "50%";
                alert.style.left = "50%";
                alert.style.transform = "translate(-50%, -50%)";
        
                document.body.appendChild(alert);
        
                var closeButton = alert.querySelector("#closeButton");
                closeButton.addEventListener("click", function () {
                    alert.remove();
                });
                };
                
                walletAlert();
            };
            

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
    }
}

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
            
    } catch (error)

    {
        console.log("Fetching error:", error);
    }
}

getCoinsList();
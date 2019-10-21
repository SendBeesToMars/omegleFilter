let body = document.getElementsByTagName("body")[0];
const config = { attributes: true, childList: true, subtree: true };

const bodyCallback = function(){
    let logbox = document.getElementsByClassName("logbox")[0];
    if(typeof logbox !== "undefined"){
        observer.observe(logbox, config);
    }
}

const callback = function(){
    let strangermsgClass = document.getElementsByClassName("strangermsg");
    chrome.storage.sync.get("range", function(data){
        let range = data.range;
        // only checks the last message and if messages exists
        if(strangermsgClass.length <= range && strangermsgClass.length > 0){
            chrome.storage.sync.get("filter", function(data){
                let filterString = data.filter;
                let filterArray = filterString.split(",");
                for (let filter in filterArray){
                    // removes spaces from start and end of filter
                    if(filterArray[filter][0] === " "){
                        filterArray[filter] = filterArray[filter].substr(1);
                    }
                    if(filterArray[filter][filterArray[filter].length - 1] === " "){
                        filterArray[filter] = filterArray[filter].substr(0, filterArray[filter].length - 1);
                    }
                    if(strangermsgClass[strangermsgClass.length - 1].innerText.toUpperCase().includes("STRANGER: " + filterArray[filter].toUpperCase())){
                        console.log("Disconnecting. Reason: filter keyword - " + filterArray[filter]);
                        disconnect();
                    }
                }
            });
        }
    })
}

const observer = new MutationObserver(callback);
const bodyObesrver = new MutationObserver(bodyCallback);

bodyObesrver.observe(body, config);

    //disconnects and starts a new chat 
function disconnect(){
    let dcBtn = document.getElementsByClassName("disconnectbtn")[0];
    dcBtn.click();
    dcBtn.click();
    dcBtn.click();
}
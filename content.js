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
    let dcBtn = document.getElementsByClassName("disconnectbtn")[0];
    chrome.storage.sync.get("range", function(data){
        let range = data.range;
        console.log("range: " + range + "\nlen: " + strangermsgClass.length);
        if(strangermsgClass.length <= range && strangermsgClass.length > 0){
            console.log("inside range check");
            chrome.storage.sync.get("filter", function(data){
                let filter = data.filter;
                console.log(strangermsgClass[strangermsgClass.length - 1].innerText.toUpperCase() + "@@@ " + "STRANGER: " + filter);
                if(strangermsgClass[strangermsgClass.length - 1].innerText.toUpperCase().includes("STRANGER: " + filter.toUpperCase())){
                    console.log("Disconnecting. Reason: filter ");
                    // dcBtn.click();
                    // dcBtn.click();
                    // dcBtn.click();
                    alert("dc");
                }
            });
        }
    })
}

const observer = new MutationObserver(callback);
const bodyObesrver = new MutationObserver(bodyCallback);

bodyObesrver.observe(body, config);
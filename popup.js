let filterInput = document.getElementById('filterInput');
let filterOutput = document.getElementById('filterOutput');
let filterRange = document.getElementById("filterRange");
let rangeNumber = document.getElementById("rangeNumber");
let filterForm = document.getElementById("filterForm");

chrome.storage.sync.get("range", function(data){
  rangeNumber.innerText = "first " + data.range;
  filterRange.value = data.range;
});

filterRange.oninput = function() {
  chrome.storage.sync.set({"range" : this.value});
  rangeNumber.innerHTML = "first " + this.value;
}

chrome.storage.sync.get('filter', function(data) {
    filterOutput.innerText = data.filter;
});

filterForm.onsubmit = function(){
  event.preventDefault();
  chrome.storage.sync.set({filter : filterInput.value});
  chrome.storage.sync.get('filter', function(data) {
    filterOutput.innerText = data.filter;
  });
}

chrome.storage.sync.get('filter', function(data){
  filterInput.value = data.filter;
})

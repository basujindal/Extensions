// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");
let getNewCompanies = document.getElementById("getNewCompanies");
let resetColor = document.getElementById("resetColor");

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setCompanies,
  });
});

getNewCompanies.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: GetNewCompanies,
  });
});

resetColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: ResetColor,
  });
});


function setCompanies() {

  var companies = [];
  var myrows = document.getElementsByTagName("tr");
  len = myrows.length;
  for (let i = 8; i < len-1; i++) { 
    var mycomp = myrows[i].getElementsByTagName("td")[1];
    var tex = mycomp.getElementsByTagName("strong")[0].textContent;
    var role = myrows[i].getElementsByTagName("td")[2].innerText;
    var comp = tex[0] + tex[2] + tex[tex.length - 1] + "|" + role[1] + role[0] + role[role.length - 1];
    console.log(comp)
    companies.push(comp);

  };
  len = len - 9

  chrome.storage.sync.set({"prevc": companies}, function() {
  alert('Total companies = ' + len);
});

};


function GetNewCompanies() {

  chrome.storage.sync.get(['prevc'], function(result) {
    newcomps = ["New Companies:"];
    myrows = document.getElementsByTagName("tr");
    len = myrows.length;
    company = result['prevc'];

    for (let i = 8; i < len-1; i++) { 
      mycomp = myrows[i].getElementsByTagName("td")[1];
      tex = mycomp.getElementsByTagName("strong")[0].textContent;
      role = myrows[i].getElementsByTagName("td")[2].innerText;
      idx = myrows[i].getElementsByTagName("td")[0].innerText;
      comp = tex[0] + tex[2] + tex[tex.length - 1] + "|" + role[1] + role[0] + role[role.length - 1];

      if (!(company.includes(comp))){
        console.log(comp)
        mycomp.style.background = 'gold';
        newcomps.push(idx + ") "+ tex + " | " + role);
      }
    }
    numcomp = newcomps.length -1;

    alert("Number of New Companies = " + numcomp + "\n" + newcomps.join("\n"));
  });
}


function ResetColor() {

    myrows = document.getElementsByTagName("tr");
    len = myrows.length;

    for (let i = 8; i < len-1; i++) { 
      mycomp = myrows[i].getElementsByTagName("td")[1];
      mycomp.style.background = myrows[i].getElementsByTagName("td")[2].style.background;
    }
}




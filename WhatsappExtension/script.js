existCondition = setInterval(function() {
 if (document.querySelector('[title="Status"]').style) {
    console.log("Exists!");
    document.querySelector('[title="Status"]').style.display = 'none';
    clearInterval(existCondition);
 }
}, 1000); // check every 100ms


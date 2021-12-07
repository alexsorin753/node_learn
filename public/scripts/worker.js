onmessage = function(e) {
    let workerResult;
    this.setTimeout(() => {
        workerResult = e.data + 1;
        this.postMessage(workerResult);            
    }, 2000);
}
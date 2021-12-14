document.addEventListener('DOMContentLoaded', function() {

    // footer 
    // (function main_minHeight() {
    //     const main = document.querySelector('body > main');
    //     const header = document.querySelector('body > header');
    //     const footer = document.querySelector('body > footer');

    //     let header_height = parseInt( window.getComputedStyle(header).height );
    //     let footer_height = parseInt( window.getComputedStyle(footer).height );

    //     main.style.minHeight = window.innerHeight - header_height - footer_height + 'px';
    // })();

    // count
    (function count() {
        const btn = document.querySelector('.count_btn > button');
        const count = document.querySelector('.count_btn > p');

        let count_num = 0
        btn.addEventListener('click', function() {
            if(count_num === 0) count.children[0].style.color = 'green';
            count.children[0].textContent = ++count_num;
        });
    })(); 


    // worker - https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
    (function worker() {
        let myWorker = new Worker('/scripts/worker.js');

        const btn = document.querySelector('.worker_btn > button');
        const count = document.querySelector('.worker_btn > p:first-of-type span');
        const status = document.querySelector('.worker_btn > p:last-of-type span');

        console.log(myWorker)
        btn.addEventListener('click', function() {
            myWorker.postMessage( Number(count.textContent) );
            status.textContent = 'Message posted to worker';
            count.style.color = 'orange';
            status.style.color = 'orange';
        });

        myWorker.onmessage = function(e) {
            count.textContent = e.data;
            status.textContent = 'Message received from worker';
            count.style.color = 'green';
            status.style.color = 'green';
        }
    })();

    // demonstrating asynchronous code using - setTimeout()
    (function async_setT() {
        const elem = document.getElementsByClassName('async_example')[0];

        console.time('time_this');
        function insert(el) {
            elem.insertAdjacentHTML('beforeend', `
                <p>Message Synchronous ${el + 1}</p>
            `);
        }
        for(let e = 0; e < 3; e++) {
            if(e !== 1) insert(e);
            else setTimeout(insert, 1000, e); // passing parameters to  https://mzl.la/3pFVb0u
        }
        elem.insertAdjacentHTML('beforeend', `
            <p>Message Synchronous outside the loop ${0}</p>
        `);
        console.timeEnd('time_this');         
    })();

    // clock - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals#setinterval
    function time() {
        const date_el = document.getElementsByClassName('clock')[0];

        let date = new Date();
        let time = date.toLocaleTimeString();
        date_el.textContent = time;
    }; time(); setInterval(time, 1000);

    
    // async callback example 1 using internal file
    function loadAsset(url, type, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = type;

        xhr.onload = function() {
            callback(xhr.response);
        }

        xhr.send();
    }

    function displayImage(blob) {
        let objectURL = URL.createObjectURL(blob);

        let image = document.createElement('img');
        image.src = objectURL;
        document.getElementsByClassName('async_internal_img')[0].append(image);
    }
    loadAsset('/images/tao-paipai.jpg', 'blob', displayImage);

    // async callback example 2 using external link
    function getURL(url, callback) {
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'blob';

        request.onload = function() {
            callback(request.response)
        }
        request.send();
    };
    function displayExImage(blob) {
        let image = document.createElement('img');
        image.src = URL.createObjectURL(blob);

        document.getElementsByClassName('async_external_img')[0].append(image);        
    }
    getURL('https://upload.wikimedia.org/wikipedia/en/4/4c/GokumangaToriyama.png', displayExImage);

    // without callback
    // function getURL(url, type) {
    //     let request = new XMLHttpRequest();
    //     request.open('GET', url);
    //     request.responseType = type;

    //     request.onload = function() {
    //         let image = document.createElement('img');
    //         image.src = URL.createObjectURL(request.response);

    //         document.getElementsByClassName('async_external_img')[0].append(image);
    //     }
    //     request.send();
    // }; getURL('https://upload.wikimedia.org/wikipedia/en/4/4c/GokumangaToriyama.png', 'blob');
});


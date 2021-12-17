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

        // console.log(myWorker)
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

        console.time('function async_setT');
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
        console.timeEnd('function async_setT');
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

    // ------------------------------------------------------------------

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

    // my callback
    // calling back a function does not mean the called back function is asynchronous;
    // https://bytearcher.com/articles/does-taking-a-callback-make-a-function-asynchronous/
    function mycallback(callback) {
        console.log('callback 1'); callback(); console.log('callback 3');
    }; mycallback(calledback);

    function calledback() {
        // synchronous callback    
        // console.log('callback 2');

        // asynchronous callback
        setTimeout(() => {
            console.log('callback 2');
        }, 0);
    }

    // playing with promises
    function my_promise() {
        const elem = document.getElementsByClassName('async_promise_img')[0];
        let image = document.createElement('IMG');
        fetch('https://upload.wikimedia.org/wikipedia/en/8/88/Vegeta_Dragon_Ball.jpg')
        .then(function(response) {
            if(response.status === 200) return response.blob();
        }).then(function(blob) {
            image.src = URL.createObjectURL(blob);
            elem.append(image);
        }).catch(function(err) {
            elem.insertAdjacentHTML('beforeend', 
            `<p style='color: red;'>${err} - <span style='color: orange;'>Image not found</span></p>`)
        })
    }; my_promise();

    // displaying the content of a file
    function get_filecontent() {
        const elem = document.getElementsByClassName('display_json_content')[0].children[1];

        fetch('data/data.json').then(function(response) {
            if(response.status === 200) return response.json();
        }).then(function(obj) {
            elem.textContent = JSON.stringify(obj);
        }).catch(function(err) {
            elem.textContent = err;
        });
    }; get_filecontent();


    // using requestAnimationFrame
    // http://www.javascriptkit.com/javatutors/requestanimationframe.shtml
    function anim() {
        const elem1 = document.querySelector('.anim > div:last-child');
        const elem2 = document.querySelector('.anim > div:first-child');

        elem1.addEventListener('click', function() {
            // animation using requestAnimationFrame
            // let num = 0;
            // function move() {
            //     num += .5; // control speed
            //     elem2.style.left = num + 'rem';
            //     if(num < 30) requestAnimationFrame(move);
            // }
            // requestAnimationFrame(move);

            // animation using animate
            elem2.animate([
                {left: '0'},
                {left: '30rem'}
            ], {duration: 1000, fill: 'forwards'});
        })
    }; anim();

    // next week challenge - Active learning: Creating your own stopwatch!
    //https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals#clearing_intervals

    // maybe this ones too:
    // - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals#a_simple_example
    // - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals#active_learning_starting_and_stopping_our_spinner
    // - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals#active_learning_a_reaction_game
});


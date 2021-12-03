console.log('script working')



document.addEventListener('DOMContentLoaded', function() {
    const btn = document.querySelector('.count_btn');
    const count = document.querySelector('.button_count');

    let count_num = 0
    btn.addEventListener('click', function() {
        if(count_num === 0) count.children[0].style.color = 'green';
        count.children[0].textContent = ++count_num
    })    
})


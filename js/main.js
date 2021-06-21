// title marqueeText
function makeMarquee() {
    const title = "FIFTY Music Festival — November 10–12, Desert Valley";
    const marqueeText = new Array(50).fill(title).join(' - ');
    $('.marquee span').text(marqueeText);
}
makeMarquee();
const random = (min, max) => {
    return Math.floor(Math.random()*(max - min + 1))+min;
}

// circles
// here we grab all our the .circles from the html 
const circles = document.querySelectorAll(".circle");
// circles returns us an array so we need to loop through it
// inside of the forEach we get access to each individual element
circles.forEach((circle, index) => {
    // in here we get access to one as 'circle'
    // along with its index
    circle.animate([
        // keyframes
        {
            transform: 'scale(1)'
        },
        {
            transform: 'scale(1.2)'
        },
        {
            transform: 'scale(1)'
        }
    ], {
        // here we use the index to create a staggerd animation delay
        // timing options
        delay: 300 * index,
        duration: 3000,
        iterations: Infinity
    });
})

const squiggle = document.querySelectorAll('.squiggle');
squiggle.forEach((squiggle, index) => {
    let randomNumber= random(0, 45);
    squiggle.animate([
        {transform: "rotate(0deg)"},
        {transform:`rotate(${randomNumber}deg)`},
        {transform: "rotate(0deg)"}
    ], {
        delay: 300 * index,
        duration: 5000,
        iterations: Infinity
    })
})

// here we want to detect when our section enters the viewport
// when it does, we want to add a class of 'in-viewport', and 
// when it exits we want to remove it again
inView('.section')
.on('enter', section => {
    // classList.add is the same as jQuery's .addClass() method 
    // but with vanilla javascript version
    section.classList.add('in-viewport');
})
.on('exit', section => {
    section.classList.remove('in-viewport');
});



// here we set the class to add only once we have scrolled 0.2 
// of our section into the viewport
inView.threshold(0.2);


/* 1.we want to select all of our sections an dloop through them
    2. in each section we want to grab the artists and shapes 
    3. for both of these we want to add transition-delay effects 
    4. we want to make sure our shapes nly fade in after our artists*/
    const sections = document.querySelectorAll('.section');
    sections.forEach((section,index)=>{
        // here we use querySelectorAll on our 'section' to only
        // find elements inside of our section vs our entire page 
        const artists = section.querySelectorAll('.lineup li');
        const shapes = section.querySelectorAll('.shape');


        artists.forEach((artist, index )=>{
            const delay = index * 100;
            artist.style.transitionDelay = delay +'ms';
        })

        shapes.forEach((shape, index )=>{
            // we are setting our delay up to only start once all of our 
            // artists have faded in, using the .length property
            const delay = (artists.length + index)*100;
            shape.style.transitionDelay = delay +'ms';
        })
    })

// 1. whenever we click a js-croll link we want to run a function 
// 2. we want to stop the link from jumping straight to our section(its default behavior)
// 3.we want to find out the href attribute and then grab that element 
// 4.then scroll to it using scrollIntoview

const scrollLinks= document.querySelectorAll('.js-scroll');

scrollLinks.forEach( link =>{
    // addEventListener is just the same as jquery's on.()
    // we can listen for events on the elements and then run a function
    link.addEventListener('click', (e)=>{
        // using the event keyword we get access to a snapshot of what 
        // happened when we clicked on our link 
        // this is equivalent to return false in jQuery
        // it will block the default browser behavior of the link jumping to 
        // the href attribute
        e.preventDefault();

        // here we grab the href from our link 
        const href = link.getAttribute('href');
        // here we use the new scrollTOView feature to scroll to 
        // our desired element in a smooth fashion 
        document.querySelector(href).scrollIntoView({
            behavior:'smooth'
        })
    });
    

})
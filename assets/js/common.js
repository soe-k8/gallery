function createGallery (data, feature = 'initial_load') {
    const galleryWrapper = document.getElementById("galleryWrapper");
    galleryWrapper.innerHTML = ''
    data.forEach(function callback(value, index) {
        const galleryDetails = document.createElement("div");
        galleryDetails.setAttribute("class", 'gallery-details');
        const img = document.createElement("img");
        img.setAttribute("alt", value.name);
        const figure = document.createElement("figure");
        figure.setAttribute('class','effect-ming')
        figure.setAttribute("onclick", `openLightbox('${value.img}')`);
        const figureCaption = document.createElement("figcaption");
        const h2 = document.createElement("h2");
        h2.setAttribute('class', 'sub-title')
        h2.innerHTML = value.name
        const imgSrc = `https://uats.site/${value.img}`
        const imgSrcSet = `https://uats.site/${value.img}?w=320&auto=format%2Ccompress 1x, https://uats.site/${value.img}?w=640&auto=format%2Ccompress 2x`
        if(feature === 'search') {
            img.setAttribute("src", imgSrc);
            img.setAttribute("srcset", imgSrcSet);
        } else {
            img.setAttribute("class", 'lazy-loading-img');
            img.setAttribute("data-src", imgSrc);
            img.setAttribute("data-srcset", imgSrcSet);
        }
        figure.appendChild(img)
        figureCaption.appendChild(h2)
        figure.appendChild(figureCaption)
        galleryDetails.appendChild(figure);

        const imgDetails = document.createElement("div");
        imgDetails.setAttribute("class", 'img-details');

        const dateElement = document.createElement("span");
        dateElement.setAttribute("class", 'date');
        const date = new Date(value.date);
        // dateElement.innerHTML = value.id;
        dateElement.innerHTML =  date.toDateString();
        imgDetails.appendChild(dateElement);

        const viewCountElement = document.createElement("span");
        viewCountElement.setAttribute("class", 'view');
        viewCountElement.innerHTML = `${value.view_count} Views`
        imgDetails.appendChild(viewCountElement);

        galleryDetails.appendChild(imgDetails);

        galleryWrapper.appendChild(galleryDetails);
    });
    // setTimeout(function () {
    //     lazylaod()
    // })
}
function createSlider (data) {
    const swiperWrapper = document.getElementById("swiperWrapper");
    swiperWrapper.innerHTML = ''
    const initialSwiperSlide = document.createElement("div");
    initialSwiperSlide.setAttribute("class", 'swiper-slide');

    const initialSwiperImg = document.createElement("img");
    initialSwiperImg.setAttribute("id", 'overLayImg');
    initialSwiperImg.setAttribute("src", 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'640\' height=\'427\' viewBox=\'0 0 640 427\'%3E%3C/svg%3E');
    initialSwiperSlide.appendChild(initialSwiperImg);
    swiperWrapper.appendChild(initialSwiperSlide);
    data.forEach(function callback(value, index) {
        const swiperSlide = document.createElement("div");
        swiperSlide.setAttribute("class", 'swiper-slide');
        swiperSlide.setAttribute("id", `swiper-slide-${value.id}`);
        const img = document.createElement("img");
        img.setAttribute("alt", value.name);
        img.setAttribute("class", 'lazy-loading-img');
        const imgSrc = `https://uats.site/${value.img}`
        const imgSrcSet = `https://uats.site/${value.img}?w=320&auto=format%2Ccompress 1x, https://uats.site/${value.img}?w=640&auto=format%2Ccompress 2x`
        img.setAttribute("data-src", imgSrc);
        img.setAttribute("data-srcset", imgSrcSet);
        swiperSlide.appendChild(img);

        swiperWrapper.appendChild(swiperSlide);
    });
    setTimeout(function () {
        lazyload()
    })
}
async function loadPhotos(filename, page = 1) {
    // const apiHost = 'https://mocki.io/v1/b'
    const host = window.location.href
    let fileName = '../assets/data/pets.json';
    if(host.includes("food.html")) {
        fileName = '../assets/data/food.json'
    } else if(host.includes("cars.html")) {
        fileName = '../assets/data/cars.json'
    } else if(host.includes("fashion.html")) {
        fileName = '../assets/data/fashion.json'
    } else if(host.includes("sports.html")) {
        fileName = '../assets/data/sports.json'
    } else if(host.includes("travel.html")) {
        fileName = '../assets/data/travel.json'
    } else if(host.includes("wildlife.html")) {
        fileName = '../assets/data/wildlife.json'
    }

    const response = await fetch(fileName);
    console.log('respon', response);
    const temp = await response.json();
    const itemsPerPage = 24;
    const offset = (page - 1) * itemsPerPage;
    const count = itemsPerPage * page;
    console.log(offset, itemsPerPage)
    const pets = temp.slice(offset, count);
    createGallery (pets);
    createSlider(pets)
}

async function filterPhoto () {
    const host = window.location.href
    let fileName = '../assets/data/pets.json';
    if(host.includes("food.html")) {
        fileName = '../assets/data/food.json'
    } else if(host.includes("cars.html")) {
        fileName = '../assets/data/cars.json'
    } else if(host.includes("fashion.html")) {
        fileName = '../assets/data/fashion.json'
    } else if(host.includes("sports.html")) {
        fileName = '../assets/data/sports.json'
    } else if(host.includes("travel.html")) {
        fileName = '../assets/data/travel.json'
    } else if(host.includes("wildlife.html")) {
        fileName = '../assets/data/wildlife.json'
    }
    const photoName = document.getElementById("photo").value;
    const response = await fetch(fileName);
    const photos = await response.json();

    const filteredObjects = photos.filter(obj =>
        obj.name.toLowerCase().includes(photoName.toLowerCase())
    );
    createGallery(filteredObjects, 'search');
}


function showMenu () {
    const navMenu = document.getElementById("navMenu");
    // const menuHamburger = document.getElementById("menuHamburger");
    navMenu.classList.toggle("show-menu");
    // menuHamburger.classList.toggle("open-menu");
}

function openLightbox (img) {
    const overlayImg = document.getElementById('overLayImg');
    const imgSrc = `https://uats.site/${img}`
    const imgSrcSet = `https://uats.site/${img}?w=320&auto=format%2Ccompress 1x, https://uats.site/${img}?w=640&auto=format%2Ccompress 2x`
    overlayImg.setAttribute('src', imgSrc)
    overlayImg.setAttribute('srcset', imgSrcSet)
    new Swiper('.swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
    document.getElementById('Lightbox').style.display = 'flex';
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
}
function closeLightbox () {
    document.getElementById('Lightbox').style.display = 'none';
    document.getElementsByTagName('body')[0].style.overflow = 'auto'
}


const Photoinput = document.getElementById("photo");
// Execute a function when the user presses a key on the keyboard
if(Photoinput) {
    Photoinput.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            filterPhoto ()
        }
    });
}

function logout() {
    window.localStorage.removeItem("jwt");
    window.localStorage.removeItem("userData");
    window.location.replace("login.html");
}



const jwt = window.localStorage.getItem('jwt');
console.log("jwt", jwt);
const collection = document.getElementsByClassName("loggedinItem");
const collection2 = document.getElementsByClassName("notLoggedinItem");
if (jwt) {
    for(let i = 0; i < collection.length; i++)
    {
        collection[i].classList.remove('hidden');
        console.log(collection[i].className);
    }
    for(let j = 0; j < collection2.length; j++)
    {
        collection2[j].classList.add('hidden');
        console.log(collection2[j].className);
    }
} else {
    for(let i = 0; i < collection.length; i++)
    {
        collection[i].classList.add('hidden');
        console.log(collection[i].className);
    }
    for(let j = 0; j < collection2.length; j++)
    {
        collection2[j].classList.remove('hidden');
        console.log(collection2[j].className);
    }
}
function lazyload () {
    /** for lazy loading **/
    const lazyImages = document.querySelectorAll('.lazy-loading-img');
    const lazyLoad = (entries, observer) => {
        entries.forEach(entry => {

            if (entry.target.classList.contains('loading')) {
                entry.target.addEventListener('load', function () {
                    // Hide the loader when the image is loaded
                    entry.target.classList.remove('loading');
                    // entry.target.parentElement.querySelector('.loader').style.display = 'none';
                });
            }

            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.srcset = img.dataset.srcset;
                img.removeAttribute('data-srcset');
                img.classList.remove('lazy-loading-img');
                // img.parentElement.querySelector('.loader').style.display = 'block'
                observer.unobserve(img);
            }
        });
    };

    const observer = new IntersectionObserver(lazyLoad, {
        rootMargin: '0px',
        // threshold: 0.1
    });

    // Observe each lazy image
    lazyImages.forEach(image => {
        observer.observe(image);
    });
    /** end of  lazy loading */
}

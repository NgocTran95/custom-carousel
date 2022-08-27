const nextBtn = document.querySelector('.carousel-btn.next')
const prevBtn = document.querySelector('.carousel-btn.prev')
const slideContainer = document.querySelector('.slide-container')
const slides = document.querySelectorAll('.slide')
const indicatorContainer = document.querySelector('.carousel-indicators')

slides.forEach((slide, index) => {
    slide.style.left = `${index*100}%`
    createIndicator()
})

let currentIndex = 0
let isPause = false
const indicators = document.querySelectorAll('.indicators-item')
indicators[0].classList.add('filled')

nextBtn.addEventListener('click', () => {
    currentIndex++
    sliderHandle()
    activeIndicator()
})

prevBtn.addEventListener('click', () => {
    currentIndex--
    sliderHandle()
    activeIndicator()
})

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentIndex = index
        sliderHandle()
        activeIndicator()
    })
})

setInterval(() => {
    if (!isPause) {
        currentIndex++
        sliderHandle()
        activeIndicator()
    }
},3000)

slideContainer.addEventListener('mouseenter', () => {
    isPause = true
})

slideContainer.addEventListener('mouseleave', () => {
    isPause = false
})

nextBtn.addEventListener('mouseenter', () => {
    isPause = true
})

nextBtn.addEventListener('mouseleave', () => {
    isPause = false
})

prevBtn.addEventListener('mouseenter', () => {
    isPause = true
})

prevBtn.addEventListener('mouseleave', () => {
    isPause = false
})

indicatorContainer.addEventListener('mouseenter', () => {
    isPause = true
})

indicatorContainer.addEventListener('mouseleave', () => {
    isPause = false
})

function sliderHandle() {
    if (currentIndex > slides.length - 1) {
        currentIndex = 0
    }
    if (currentIndex < 0) {
        currentIndex = slides.length - 1
    }
    slides.forEach((slide) => {
        slide.style.transform = `translateX(-${currentIndex*100}%)`
    })
}

function createIndicator() {
    let indicator = document.createElement('div')
    indicator.classList.add('indicators-item')
    indicatorContainer.appendChild(indicator)
}

function activeIndicator () {
    let activeIndicator = document.querySelector('.indicators-item.filled')
    indicators[currentIndex].classList.add('filled')
    activeIndicator.classList.remove('filled')
}




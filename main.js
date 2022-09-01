// First Custom

// const nextBtn = document.querySelector('.carousel-btn.next')
// const prevBtn = document.querySelector('.carousel-btn.prev')
// const slideContainer = document.querySelector('.slide-container')
// const slides = document.querySelectorAll('.slide')
// const indicatorContainer = document.querySelector('.carousel-indicators')

// slides.forEach((slide, index) => {
//     slide.style.left = `${index*100}%`
//     createIndicator()
// })

// let currentIndex = 0
// let isPause = false
// const indicators = document.querySelectorAll('.indicators-item')
// indicators[0].classList.add('filled')

// nextBtn.addEventListener('click', () => {
//     currentIndex++
//     sliderHandle()
//     activeIndicator()
// })

// prevBtn.addEventListener('click', () => {
//     currentIndex--
//     sliderHandle()
//     activeIndicator()
// })

// indicators.forEach((indicator, index) => {
//     indicator.addEventListener('click', () => {
//         currentIndex = index
//         sliderHandle()
//         activeIndicator()
//     })
// })

// setInterval(() => {
//     if (!isPause) {
//         currentIndex++
//         sliderHandle()
//         activeIndicator()
//     }
// },3000)

// slideContainer.addEventListener('mouseenter', () => {
//     isPause = true
// })

// slideContainer.addEventListener('mouseleave', () => {
//     isPause = false
// })

// nextBtn.addEventListener('mouseenter', () => {
//     isPause = true
// })

// nextBtn.addEventListener('mouseleave', () => {
//     isPause = false
// })

// prevBtn.addEventListener('mouseenter', () => {
//     isPause = true
// })

// prevBtn.addEventListener('mouseleave', () => {
//     isPause = false
// })

// indicatorContainer.addEventListener('mouseenter', () => {
//     isPause = true
// })

// indicatorContainer.addEventListener('mouseleave', () => {
//     isPause = false
// })

// function sliderHandle() {
//     if (currentIndex > slides.length - 1) {
//         currentIndex = 0
//     }
//     if (currentIndex < 0) {
//         currentIndex = slides.length - 1
//     }
//     slides.forEach((slide) => {
//         slide.style.transform = `translateX(-${currentIndex*100}%)`
//     })
// }

// function createIndicator() {
//     let indicator = document.createElement('div')
//     indicator.classList.add('indicators-item')
//     indicatorContainer.appendChild(indicator)
// }

// function activeIndicator () {
//     let activeIndicator = document.querySelector('.indicators-item.filled')
//     indicators[currentIndex].classList.add('filled')
//     activeIndicator.classList.remove('filled')
// }

//  Second Custom

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const slides = $$('.slide')
const slideContainer = $('.slide-container') 
const indicatorContainer = $('.carousel-indicators')
const nextBtn = $('.carousel-btn.next')
const prevBtn = $('.carousel-btn.prev')

//  First setup
let currentIndex = 0

slides.forEach(() => {
    createIndicator()
})

slideRender(createSlideArr(currentIndex))

// Next-Prev Handle

nextBtn.addEventListener('click', () => {
    createSlideArr(currentIndex).forEach((slideIndex,index) => {
        slides[slideIndex].style.left = `${(index-2)*100}%`
    })
    setTimeout(() => {
        if (currentIndex == slides.length-1) {
            currentIndex = 0
        } else {
            currentIndex++
        }
        slideRender(createSlideArr(currentIndex))
    },300)
})

prevBtn.addEventListener('click', () => {
    createSlideArr(currentIndex).forEach((slideIndex,index) => {
        slides[slideIndex].style.left = `${(index)*100}%`
    })
    setTimeout(() => {
        if (currentIndex == 0) {
            currentIndex = slides.length - 1
        } else {
            currentIndex--
        }
        slideRender(createSlideArr(currentIndex))
    },300)
})

// Auto-Next Handle
let isPause = false

setInterval(() => {
    if (!isPause) {
        createSlideArr(currentIndex).forEach((slideIndex,index) => {
            slides[slideIndex].style.left = `${(index-2)*100}%`
        })
        setTimeout(() => {
            if (currentIndex == slides.length-1) {
                currentIndex = 0
            } else {
                currentIndex++
            }
            slideRender(createSlideArr(currentIndex))
        },300)
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

// Indicator onclick handle 
const indicators = $$('.indicators-item')
indicators.forEach((indicator,index) => {
    indicator.addEventListener('click', () => {
        currentIndex = index
        slideRender(createSlideArr(currentIndex))
    })
})

function createSlideArr (index) {
    if (index == 0) {
        return [slides.length-1, 0, 1]
    } if (index == slides.length -1) {
        return [slides.length -2, slides.length -1, 0]
    } else {
        return [index-1, index, index+1]
    }
}

function createIndicator() {
    let indicator = document.createElement('div')
    indicator.classList.add('indicators-item')
    indicatorContainer.appendChild(indicator)
}
    
function slideRender(slideArr) {
    slides.forEach(item => {
        if (item.style.zIndex) {
            item.style.removeProperty('z-index')
        }
        if (item.style.display) {
            item.style.removeProperty('display')
        }
    })
    slides[currentIndex].style.zIndex = '1'
    slideArr.forEach((slideIndex, index) => {
        slides[slideIndex].style.display = 'block'
        slides[slideIndex].style.left = `${(index-1)*100}%`
    })
    activeIndicator(slideArr[1])
}

function activeIndicator(index) {
    let indicators = $$('.indicators-item')
    let activeIndicator = $('.indicators-item.filled')
    if (activeIndicator) {
        activeIndicator.classList.remove('filled')
    }
    indicators[index].classList.add('filled')
}
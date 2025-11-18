fetch('images.json')
  .then(response => response.json())
  .then(data => {
    let slider = document.querySelector('.slider')
    let sliderList = slider.querySelector('.slider .list')
    let thumbnail = document.querySelector('.slider .thumbnail')

    // Clear existing items
    sliderList.innerHTML = ''
    thumbnail.innerHTML = ''

    // Create items from JSON
    data.forEach(item => {
      // Create list item
      const listItem = document.createElement('div')
      listItem.className = 'item'
      listItem.innerHTML = `
        <img src="${item.src}" alt="">
        <div class="content">
          <div class="title">${item.title}</div>
          <div class="type">${item.type}</div>
          <div class="description">${item.description}</div>

        </div>
      `
      sliderList.appendChild(listItem)

      // Create thumbnail item
      const thumbItem = document.createElement('div')
      thumbItem.className = 'item'
      thumbItem.innerHTML = `<img src="${item.src}" alt="">`
      thumbnail.appendChild(thumbItem)
    })

    // Move first thumbnail to end for initial setup
    let thumbnailItems = thumbnail.querySelectorAll('.item')
    thumbnail.appendChild(thumbnailItems[0])

    // Setup buttons
    let nextBtn = document.querySelector('.next')
    let prevBtn = document.querySelector('.prev')

    nextBtn.onclick = function() {
      moveSlider('next')
    }

    prevBtn.onclick = function() {
      moveSlider('prev')
    }

    function moveSlider(direction) {
      let sliderItems = sliderList.querySelectorAll('.item')
      let thumbnailItems = document.querySelectorAll('.thumbnail .item')

      if(direction === 'next'){
        sliderList.appendChild(sliderItems[0])
        thumbnail.appendChild(thumbnailItems[0])
        slider.classList.add('next')
      } else {
        sliderList.prepend(sliderItems[sliderItems.length - 1])
        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1])
        slider.classList.add('prev')
      }

      slider.addEventListener('animationend', function() {
        if(direction === 'next'){
          slider.classList.remove('next')
        } else {
          slider.classList.remove('prev')
        }
      }, {once: true})
    }
  })
  .catch(error => console.error('Error loading images:', error))
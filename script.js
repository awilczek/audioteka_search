console.log('Audioteka Better Search: Running...');

function addHub () {
    const title = document.querySelector("h1.page-title.text-center");

    const priceDiv = document.createElement("div");
    priceDiv.style = "text-align: center;";
    
    const minPriceSpan = document.createElement("span");
    minPriceSpan.innerHTML = "minPrice:&nbsp;"
    priceDiv.appendChild(minPriceSpan);
    const minPriceInput = document.createElement("input");
    minPriceInput.type = "number";
    minPriceInput.min = 0;
    minPriceInput.onchange = refreshList;
    priceDiv.appendChild(minPriceInput);

    const maxPriceSpan = document.createElement("span");
    maxPriceSpan.innerHTML = "maxPrice:&nbsp;"
    const maxPriceInput = document.createElement("input");
    maxPriceInput.type = "number";
    maxPriceInput.min = 0;
    maxPriceInput.onchange = refreshList;
    priceDiv.appendChild(maxPriceSpan);
    priceDiv.appendChild(maxPriceInput);
    
    title.parentNode.insertBefore(priceDiv, title);

    const starsDiv = document.createElement("div");
    starsDiv.style = "text-align: center;";
    
    const minStarsSpan = document.createElement("span");
    minStarsSpan.innerHTML = "minStars:&nbsp;"
    const minStarsInput = document.createElement("input");
    minStarsInput.type = "number";
    minStarsInput.min = 0;
    minStarsInput.max = 5;
    minStarsInput.step = 0.5;
    minStarsInput.onchange = refreshList;
    starsDiv.appendChild(minStarsSpan);
    starsDiv.appendChild(minStarsInput);

    const maxStarsSpan = document.createElement("span");
    maxStarsSpan.innerHTML = "maxStars:&nbsp;"
    const maxStarsInput = document.createElement("input");
    maxStarsInput.type = "number";
    maxStarsInput.min = 0;
    maxStarsInput.max = 5;
    maxStarsInput.step = 0.5;
    maxStarsInput.onchange = refreshList;
    starsDiv.appendChild(maxStarsSpan);
    starsDiv.appendChild(maxStarsInput);
    
    title.parentNode.insertBefore(starsDiv, title);

    function refreshList () {
        const minPrice = parseFloat(minPriceInput.value.replace(",", "."));
        const maxPrice = parseFloat(maxPriceInput.value.replace(",", "."));
        const minStars = parseFloat(minStarsInput.value.replace(",", "."));
        const maxStars = parseFloat(maxStarsInput.value.replace(",", "."));
        
        const items = document.querySelectorAll("div.item");
        for (const item of items) {
            const price = parseFloat((item.querySelector("a.lowest-price") || item.querySelector("a.price")).innerHTML.split('&nbsp;')[0].replace(",", "."));
            const stars = item.querySelectorAll("i.fa-star").length + item.querySelectorAll("i.fa-star-half-full").length / 2

            const shouldShow = (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice) &&
                (!minStars || stars >= minStars) && (!maxStars || stars <= maxStars);

            // console.log(`item: ${item.getAttribute("data-product-id")} price: ${price} stars: ${stars} shouldShow: ${shouldShow}`);
            
            if (shouldShow) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        }
    }

    const loadAllDiv = document.createElement("div");
    loadAllDiv.style = "text-align: center;";
    const loadAllButton = document.createElement("button");
    loadAllButton.innerText = "LOAD ALL";
    loadAllButton.onclick = loadMore;
    loadAllDiv.appendChild(loadAllButton);
    title.parentNode.insertBefore(loadAllDiv, title);

    function loadMore () {
        refreshList();

        if (document.querySelector("a.btn.btn-primary.js-content-load.hidden")) {
            console.log('Audioteka Better Search: Loaded all pages.');
            return;
        }

        const loading = !document.querySelector("i.fa-refresh.hidden");
        if (loading) {
            console.log('Audioteka Better Search: In progress...');
            return setTimeout(() => loadMore(), 2000);
        }

        console.log('Audioteka Better Search: Loading next page...');

        document.querySelector("a.btn.btn-primary.js-content-load").click();
        setTimeout(() => loadMore(), 2000);
    }

    console.log('Audioteka Better Search: Hub added.');
}

addHub();
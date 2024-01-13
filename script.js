console.log('Audioteka Better Search: Running...');

function addHub () {
    const title = document.querySelector("h1.page-title.text-center");
    const form = document.createElement("form");
    form.classList = "col-lg-12 form-horizontal";
    title.parentNode.insertBefore(form, title);

    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("col-lg-1");
    form.appendChild(emptyDiv);

    const minPriceLabel = document.createElement("label");
    minPriceLabel.innerHTML = "minPrice:&nbsp;"
    minPriceLabel.classList.add("col-lg-1", "control-label");
    form.appendChild(minPriceLabel);

    const minPriceDiv = document.createElement("div");
    minPriceDiv.classList.add("col-lg-1");
    const minPriceInput = document.createElement("input");
    minPriceInput.type = "number";
    minPriceInput.min = "0";
    minPriceInput.onchange = refreshList;
    minPriceInput.classList.add("form-control");
    minPriceDiv.appendChild(minPriceInput);
    form.appendChild(minPriceDiv);

    const maxPriceLabel = document.createElement("label");
    maxPriceLabel.innerHTML = "maxPrice:&nbsp;"
    maxPriceLabel.classList.add("col-lg-1", "control-label");
    form.appendChild(maxPriceLabel);

    const maxPriceDiv = document.createElement("div");
    maxPriceDiv.classList.add("col-lg-1");
    const maxPriceInput = document.createElement("input");
    maxPriceInput.type = "number";
    maxPriceInput.min = "0";
    maxPriceInput.onchange = refreshList;
    maxPriceInput.classList.add("form-control");
    maxPriceDiv.appendChild(maxPriceInput);
    form.appendChild(maxPriceDiv);
    
    const minStarsLabel = document.createElement("label");
    minStarsLabel.innerHTML = "minStars:&nbsp;"
    minStarsLabel.classList.add("col-lg-1", "control-label");
    form.appendChild(minStarsLabel);

    const minStarsDiv = document.createElement("div");
    minStarsDiv.classList.add("col-lg-1");
    const minStarsInput = document.createElement("input");
    minStarsInput.type = "number";
    minStarsInput.min = "0";
    minStarsInput.max = "5";
    minStarsInput.step = "0.5";
    minStarsInput.onchange = refreshList;
    minStarsInput.classList.add("form-control");
    minStarsDiv.appendChild(minStarsInput);
    form.appendChild(minStarsDiv);

    const maxStarsLabel = document.createElement("label");
    maxStarsLabel.innerHTML = "maxStars:&nbsp;"
    maxStarsLabel.classList.add("col-lg-1", "control-label");
    form.appendChild(maxStarsLabel);

    const maxStarsDiv = document.createElement("div");
    maxStarsDiv.classList.add("col-lg-1");
    const maxStarsInput = document.createElement("input");
    maxStarsInput.type = "number";
    maxStarsInput.min = "0";
    maxStarsInput.max = "5";
    maxStarsInput.step = "0.5";
    maxStarsInput.onchange = refreshList;
    maxStarsInput.classList.add("form-control");
    maxStarsDiv.appendChild(maxStarsInput);
    form.appendChild(maxStarsDiv);

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

    const loadMoreButton = document.querySelector("a.btn.btn-primary.js-content-load");

    if (loadMoreButton && !loadMoreButton.classList.contains("hidden")) {
        const loadAllDiv = document.createElement("div");
        loadAllDiv.classList.add("col-lg-1");
        const loadAllButton = document.createElement("a");
        loadAllButton.innerText = "LOAD ALL";
        loadAllButton.classList.add("btn", "btn-primary");
        loadAllButton.onclick = loadMore;
        loadAllDiv.appendChild(loadAllButton);
        form.appendChild(loadAllDiv);

        function loadMore () {
            refreshList();

            const loadMoreButton = document.querySelector("a.btn.btn-primary.js-content-load");

            if (!loadMoreButton || loadMoreButton.classList.contains("hidden")) {
                console.log('Audioteka Better Search: Loaded all pages.');
                return;
            }

            const loading = !document.querySelector("i.fa-refresh.hidden");
            if (loading) {
                console.log('Audioteka Better Search: In progress...');
                return setTimeout(() => loadMore(), 2000);
            }

            console.log('Audioteka Better Search: Loading next page...');

            loadMoreButton.click();
            setTimeout(() => loadMore(), 2000);
        }
    }

    console.log('Audioteka Better Search: Hub added.');
}

addHub();
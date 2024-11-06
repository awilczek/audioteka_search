console.log('Audioteka Better Search: Running...');

function addHub () {
    const topBar = document.querySelector("#layout-top-bar");
    const centerDiv = document.createElement("div");
    centerDiv.style = "display: flex; justify-content: center;"
    const form = document.createElement("form");
    form.style = "display: inline-flex";
    centerDiv.appendChild(form);
    topBar.parentNode.parentNode.insertBefore(centerDiv, topBar.parentNode);

    const emptyDiv = document.createElement("div");
    form.appendChild(emptyDiv);

    const minPriceLabel = document.createElement("label");
    minPriceLabel.innerHTML = "minPrice:&nbsp;"
    form.appendChild(minPriceLabel);

    const minPriceDiv = document.createElement("div");
    const minPriceInput = document.createElement("input");
    minPriceInput.type = "number";
    minPriceInput.min = "0";
    minPriceInput.onchange = refreshList;
    minPriceDiv.appendChild(minPriceInput);
    form.appendChild(minPriceDiv);

    const maxPriceLabel = document.createElement("label");
    maxPriceLabel.innerHTML = "maxPrice:&nbsp;"
    form.appendChild(maxPriceLabel);

    const maxPriceDiv = document.createElement("div");
    const maxPriceInput = document.createElement("input");
    maxPriceInput.type = "number";
    maxPriceInput.min = "0";
    maxPriceInput.onchange = refreshList;
    maxPriceDiv.appendChild(maxPriceInput);
    form.appendChild(maxPriceDiv);
    
    const minStarsLabel = document.createElement("label");
    minStarsLabel.innerHTML = "minStars:&nbsp;"
    form.appendChild(minStarsLabel);

    const minStarsDiv = document.createElement("div");
    const minStarsInput = document.createElement("input");
    minStarsInput.type = "number";
    minStarsInput.min = "0";
    minStarsInput.max = "5";
    minStarsInput.step = "0.5";
    minStarsInput.onchange = refreshList;
    minStarsDiv.appendChild(minStarsInput);
    form.appendChild(minStarsDiv);

    const maxStarsLabel = document.createElement("label");
    maxStarsLabel.innerHTML = "maxStars:&nbsp;"
    form.appendChild(maxStarsLabel);

    const maxStarsDiv = document.createElement("div");
    const maxStarsInput = document.createElement("input");
    maxStarsInput.type = "number";
    maxStarsInput.min = "0";
    maxStarsInput.max = "5";
    maxStarsInput.step = "0.5";
    maxStarsInput.onchange = refreshList;
    maxStarsDiv.appendChild(maxStarsInput);
    form.appendChild(maxStarsDiv);

    setInterval(refreshList, 1000);

    function refreshList () {
        const minPrice = parseFloat(minPriceInput.value.replace(",", "."));
        const maxPrice = parseFloat(maxPriceInput.value.replace(",", "."));
        const minStars = parseFloat(minStarsInput.value.replace(",", "."));
        const maxStars = parseFloat(maxStarsInput.value.replace(",", "."));

        const items = document.querySelectorAll("div.adtk-item");
        for (const item of items) {
            const price = parseFloat(item.querySelectorAll("p")[2]?.innerHTML.split('&nbsp;')[0].replace(",", "."));
            const stars = item.querySelectorAll("svg")[1]?.nextSibling.textContent

            const shouldShow = (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice) &&
                (!minStars || stars >= minStars) && (!maxStars || stars <= maxStars);

            // console.log(`item: ${item.getAttribute("data-product-id")} price: ${price} stars: ${stars} shouldShow: ${shouldShow}`);

            if (shouldShow) {
                item.removeAttribute("hidden");
            } else {
                item.setAttribute("hidden", "");
            }
        }
    }

    console.log('Audioteka Better Search: Hub added.');
}

addHub();
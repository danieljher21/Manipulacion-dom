const darkModeButton = document.getElementById("dark-mode-button");
darkModeButton.onclick = () => {document.body.classList.toggle("dark-mode");
  };

const baseUrl = "https://platzi-avo.vercel.app";
const mountNode = document.getElementById("js-mount");

const formatPrice = (price) =>
  new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(price);

;
!(async function () {
  const response = await fetch(`${baseUrl}/api/avo`);
  // 💡 More about Spread: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  const { data: allAvos } = await response.json();

  // Create the HTML Nodes for each avocado we receive from the API
  // 💡 More about Array.map: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  const nodeArray = allAvos.map((avocado) => {
    // Create image node
    // <img class="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6" src="avatar.jpg">
    const image = document.createElement("img");
    image.className =
      "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";
    image.src = `${baseUrl}${avocado.image}`;

    // Create heading
    // <h2 class="text-lg">Erin Lindford</h2>
    const title = document.createElement("h2");
    title.className = "text-lg";
    title.textContent = avocado.name;

    // Create Price
    // <div class="text-gray-600">(555) 765-4321</div>
    const price = document.createElement("div");
    price.className = "text-gray-600 dark:text-gray-300";
    price.textContent = formatPrice(avocado.price);

    // Wrap price & title
    // <div class="text-center md:text-left"><price ><title ></div>
    const priceAndTitle = document.createElement("div");
    priceAndTitle.className = "text-center md:text-left";
    priceAndTitle.appendChild(title);
    priceAndTitle.appendChild(price);

    // Wrap Img and priceAndTitle
    // <div class="md:flex bg-white rounded-lg p-6">
    const card = document.createElement("div");
    card.className = "md:flex bg-white dark:bg-gray-900 rounded-lg p-6 hover:bg-gray-300 card";
    card.appendChild(image);
    card.appendChild(priceAndTitle);

    card.onclick = () => {
      const modal = document.createElement("div");
      modal.className =
        "modal fixed top-0 left-0 w-full h-full bg-black dark:bg-white bg-opacity-50 flex items-center justify-center";

      // Create a modal content element
      const modalContent = document.createElement("div");
      modalContent.className =
        "modal-content bg-white dark:bg-gray-900 p-8 rounded shadow-lg text-center max-w-lg overflow-y-auto max-h-full";

      // Create an image element for the avocado image
      const avocadoImage = document.createElement("img");
      avocadoImage.className = "w-25 h-25 rounded-full mx-auto";
      avocadoImage.src = `${baseUrl}${avocado.image}`;

      // Create a heading element for the avocado title
      const avocadoTitle = document.createElement("h2");
      avocadoTitle.className = "text-lg";
      avocadoTitle.textContent = avocado.name;

      // Create a paragraph element for the avocado description
      const avocadoDescription = document.createElement("div");
      avocadoDescription.className = "ml-4";
      avocadoDescription.appendChild(avocadoTitle)
      

      // Iterate over the avocado attributes and create elements for each key-value pair
      for (const [key, value] of Object.entries(avocado.attributes)) {
        // Create a heading element for the attribute key
        const attributeKey = document.createElement("h3");
        attributeKey.className = "text-gray-600 dark:text-gray-300 mt-2 text-left";
        attributeKey.textContent = key.charAt(0).toUpperCase() + key.slice(1);

        const colon = document.createElement("span");
        colon.textContent = " : ";
        attributeKey.appendChild(colon)

        // Create a paragraph element for the attribute value
        const attributeValue = document.createElement("p");
        attributeValue.className = "text-gray-600 dark:text-gray-300 ml-2";
        attributeValue.textContent = value;

        attributeKey.appendChild(attributeValue)

        // Append the key and value elements to the text wrapper
        avocadoDescription.appendChild(attributeKey);
        
       ;
  }


      // Append the image, title, and description to the modal content
      modalContent.appendChild(avocadoImage);
      modalContent.appendChild(avocadoDescription)
      modalContent.appendChild(avocadoDescription);

      // Append the modal content to the modal
      modal.appendChild(modalContent);

      // Append the modal to the body
      document.body.appendChild(modal);

      // Add an onclick event to the modal to close it when clicked
      modal.onclick = () => {
        modal.remove();
      };
    };

    return card;
  });

  // Trick: Apply an array as a list of arguments
  mountNode.append(...nodeArray);
})();
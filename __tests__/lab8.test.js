describe('Basic user flow for Website', () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5555/index.html');
  });

  // Next, check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');
    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });
    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');
    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;
    let data, plainValue;
    // Query select all of the <product-item> elements
    const prodItems = await page.$$('product-item');
    console.log(`Checking product item 1/${prodItems.length}`);
    // Grab the .data property of <product-items> to grab all of the json data stored inside
    for(let i = 0; i < 20; i++){
      data = await prodItems[i].getProperty('data');
      // Convert that property to JSON
      plainValue = await data.jsonValue();
      // Make sure the title, price, and image are populated in the JSON
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.price.length == 0) { allArePopulated = false; }
      if (plainValue.image.length == 0) { allArePopulated = false; }

    }      
    // Expect allArePopulated to still be true
    expect(allArePopulated).toBe(true);
    // TODO - Step 1
    // Right now this function is only checking the first <product-item> it found, make it so that
    // it checks every <product-item> it found

  }, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');
    let pi1 = await page.$('product-item');
    let sr1 = await pi1.getProperty('shadowRoot');
    let btn1 = await sr1.$('button');
    await btn1.click();
    let result = await btn1.getProperty('innerText');
    let jsonResult = await result.jsonValue();

    expect(jsonResult).toBe('Remove from Cart');
    // TODO - Step 2
    // Query a <product-item> element using puppeteer ( checkout page.$() and page.$$() in the docs )
    // Grab the shadowRoot of that element (it's a property), then query a button from that shadowRoot.
    // Once you have the button, you can click it and check the innerText property of the button.
    // Once you have the innerText property, use innerText.jsonValue() to get the text value of it
  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');
    let result = true;
    let products = await page.$$('product-item');
    let cart_count = await page.$('#cart-count');
    for(let i = 1; i < 20; i++){    
      let sr1 = await products[i].getProperty('shadowRoot');
      let btn1 = await sr1.$('button');
      await btn1.click();
      let cartnum = await cart_count.getProperty('innerText');
      let jsonResult = await cartnum.jsonValue();
      if(jsonResult != i + 1){ result = false; }
    }
    let num = await cart_count.getProperty('innerText');
    let numJson = await num.jsonValue();
    expect(numJson).toBe("20");
    expect(result).toBe(true);
    // TODO - Step 3
    // Query select all of the <product-item> elements, then for every single product element
    // get the shadowRoot and query select the button inside, and click on it.
    // Check to see if the innerText of #cart-count is 20
  }, 10000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 4
    // Reload the page, then select all of the <product-item> elements, and check every
    // element to make sure that all of their buttons say "Remove from Cart".
    // Also check to make sure that #cart-count is still 20
    await page.goto('http://127.0.0.1:5555/index.html');
    let result = true;
    let products = await page.$$('product-item');
    for(let i = 0; i < 20; i++){
      let sr1 = await products[i].getProperty('shadowRoot');
      let btn1 = await sr1.$('button');
      let result = await btn1.getProperty('innerText');
      let jsonResult = await result.jsonValue();
      if(jsonResult != "Remove from Cart"){ result = false; }
    }
    let cart_count = await page.$('#cart-count');
    let num = await cart_count.getProperty('innerText');
    let numJson = await num.jsonValue();
    expect(numJson).toBe("20");
    expect(result).toBe(true);

  }, 10000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {
    let cart = await page.evaluate(() => {
        return localStorage.getItem('cart');
    });
    expect(cart).toBe('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]');
    // TODO - Step 5
    // At this point he item 'cart' in localStorage should be 
    // '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]', check to make sure it is
  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');
    // TODO - Step 6
    // Go through and click "Remove from Cart" on every single <product-item>, just like above.
    // Once you have, check to make sure that #cart-count is now 0
    let products = await page.$$('product-item');
    for(let i = 0; i < 20; i++){    
      let sr1 = await products[i].getProperty('shadowRoot');
      let btn1 = await sr1.$('button');
      await btn1.click();
    }
    let cart_count = await page.$('#cart-count');
    let num = await cart_count.getProperty('innerText');
    let numJson = await num.jsonValue();
    expect(numJson).toBe("0");
  }, 10000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 7
    // Reload the page once more, then go through each <product-item> to make sure that it has remembered nothing
    // is in the cart - do this by checking the text on the buttons so that they should say "Add to Cart".
    // Also check to make sure that #cart-count is still 0
    await page.goto('http://127.0.0.1:5555/index.html');
    let result = true;
    let products = await page.$$('product-item');
    for(let i = 0; i < 20; i++){
      let sr1 = await products[i].getProperty('shadowRoot');
      let btn1 = await sr1.$('button');
      let result = await btn1.getProperty('innerText');
      let jsonResult = await result.jsonValue();
      if(jsonResult != "Add to Cart"){ result = false; }
    }
    let cart_count = await page.$('#cart-count');
    let num = await cart_count.getProperty('innerText');
    let numJson = await num.jsonValue();
    expect(numJson).toBe("0");
    expect(result).toBe(true);
  }, 10000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');
    // TODO - Step 8
    // At this point he item 'cart' in localStorage should be '[]', check to make sure it is
    let cart = await page.evaluate(() => {
      return localStorage.getItem('cart');
    });
    expect(cart).toBe('[]');
  });
});

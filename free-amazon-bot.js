// ==UserScript==
// @name     Amazon-RefreshNoBot
// @include  https://www.amazon.com/*
// @include  http://localhost:800*
// @version      v0.0
// @description  This aint bot, its RefreshNoBot
// @author       Karan Kapuria
// @grant        window.close
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest

// Version Changelog
// 1.0-beta - Runs only Testmode.
// - Code is not complete commented.
// - No support for Amazon Captcha (Soft Ban) - Future support with local flask server
// - Dog Pages are not handled
// 1.1-beta - Fixed Sellers Loop
// - When in Sellers, Used items are not checked for
// - Still No support for Amazon Captcha (Soft Ban) & Dog Pages
// - More code commented
// 2.0 - Fully Functional Bot with Local Gunicorn Server
// - Using flask, gunicorn and amazoncapcha; we solve Amazon Captcha (Soft Ban)
// - Faster page reload on seller pages (4 Seconds)
// - When cart is disabled with Dog Pages, it will refresh cart every 10 second
// - When resellers are disabled, bot will show 0 items and refresh
// - No autocheckout yet. Will be released as minor update later.
// 0.0 - bug fixes
// - More code commented

// ==/UserScript==


/*


 █████╗ ███╗   ███╗ █████╗ ███████╗ ██████╗ ███╗   ██╗    ██████╗  ██████╗ ████████╗
██╔══██╗████╗ ████║██╔══██╗╚══███╔╝██╔═══██╗████╗  ██║    ██╔══██╗██╔═══██╗╚══██╔══╝
███████║██╔████╔██║███████║  ███╔╝ ██║   ██║██╔██╗ ██║    ██████╔╝██║   ██║   ██║
██╔══██║██║╚██╔╝██║██╔══██║ ███╔╝  ██║   ██║██║╚██╗██║    ██╔══██╗██║   ██║   ██║
██║  ██║██║ ╚═╝ ██║██║  ██║███████╗╚██████╔╝██║ ╚████║    ██████╔╝╚██████╔╝   ██║
╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝    ╚═════╝  ╚═════╝    ╚═╝

       “Make it work, make it right, make it fast.” – Kent Beck

                                                                  */
       "use strict";
       //________________________________________________________________________
       
       //  CONSTANTS
       // [ Do not add/remove quotation marks when updating]
       //________________________________________________________________________
       
       //____ REQUIRED FLAGS : AMAZON ID & PRICE CUTOFF _________________________
       
       
       let PRODUCT_ARRAY = ["B083HZFK45", "B096YM573B", "B096WM6JFS", "B096YMW2FS", "B09B1DGRH4"];
       const CUTOFF_ARRAY = [800, 500, 1400, 500, 500]; // No quotes
       
       //____ REQUIRED FLAGS : TESTMODE OR BUY MODE _____________________________
       
       // Make sure your cart is EMPTY
       const TESTMODE = "Yes" // "No" will buy the card or whatever is in your cart
       
       
       //________________________________________________________________________
       
       //                       MAIN CODE : DO NOT CHANGE
       //________________________________________________________________________
       
       const PRODUCT_URL = document.URL
       
       const delay = ms => new Promise(res => setTimeout(res, ms));
       const NUMERIC_REGEXP = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
       
       const RETRY_COUNT = 1
       
       //________________________________________________________________________
       
       //                 MAIN CODE : FINAL CHECKOUT PAGE
       //________________________________________________________________________
       // If Page is in Final Checkout Play the sound
       
       if (document.URL.includes('https://www.amazon.com/gp/buy/spc/handlers/display.html?hasWorkingJavascript=1')) {
               console.log('Here')
               var DA_TA_DA1 = new Audio("https://github.com/kkapuria3/Best-Amazon-Bot/blob/dev-v2.0/resources/dramatic-sound-effect.wav?raw=true");
               DA_TA_DA1.play()
       
           if (TESTMODE === "No") {
       
               document.getElementsByClassName('a-button-text place-your-order-button')[0].click()
       
           }
       }
       
       
       // On Cart Page, check if any item in cart. It can be any item. Page will redirect to Final Checkout.
       else if (document.URL.includes('https://www.amazon.com/gp/cart/')) {
       
               setTimeout(function() {
       
                       if (document.getElementsByClassName("a-size-medium a-color-base sc-price sc-white-space-nowrap").length > 0) {
       
                               document.getElementsByClassName('a-button-input')[0].click()
       
                       } else {
       
                               console.log('Empty Cart')
                               location.reload()
                       }
       
               }, 2000)
       
       
       }
       else if (document.URL.includes('https://www.amazon.com/ap/signin')) {
       
               document.getElementById('signInSubmit').click()
       
       }
       
       //________________________________________________________________________
       
       //                        MAIN CODE : CAPTCHA PAGES
       //________________________________________________________________________
       
       
       
       else if (document.getElementsByClassName("a-box a-alert a-alert-info a-spacing-base").length > 0) {
       
               console.log(document.getElementsByClassName("a-box a-alert a-alert-info a-spacing-base"))
               console.log('CAPCTHA PAGE')
       
               var Oh_No_Its_Some_Captcha = new Audio("https://github.com/kkapuria3/BestBuy-GPU-Bot/blob/dev-v2.5-mem_leak_fix/resources/alert.mp3?raw=true");
               Oh_No_Its_Some_Captcha.play()
       
               //"\n<img src=\"https://images-na.ssl-images-amazon.com/captcha/dddfleoy/Captcha_lkdgslujsl.jpg\">\n
       
               var IMAGE_URL = document.getElementsByClassName("a-row a-text-center")[1].innerHTML.split('captcha/')[1]
               var FIRST_ELEMENT = IMAGE_URL.split('/')[0]
               var SECOND_ELEMENT_Raw = IMAGE_URL.split('/')[1]
               var SECOND_ELEMENT = SECOND_ELEMENT_Raw.split('">')[0]
               console.log(SECOND_ELEMENT)
       
               const CAPTCHA_URL = 'http://localhost:8000/url/' + FIRST_ELEMENT + '/' + SECOND_ELEMENT
               console.log(CAPTCHA_URL)
               GM_xmlhttpRequest({
                       method: "POST",
                       url: CAPTCHA_URL,
                       onload: function(response) {
       
                               console.log(response.response);
                               GM_setValue(CAPTCHA_URL, response.response);
       
       
                       }
               })
       
       
               setTimeout(function() {
       
                       const SOLUTION = GM_getValue(CAPTCHA_URL);
                       document.getElementById("captchacharacters").value = SOLUTION
                       document.getElementsByClassName('a-button-text')[0].click()
       
               }, 9000)
       
       
       
       
       }
       
       //________________________________________________________________________
       
       //                   MAIN CODE : ITEM PAGE OPERATIONS
       //________________________________________________________________________
       
       for (let i = 0; i < PRODUCT_ARRAY.length; i++) {
       
               const AMAZON_PRODUCT_ID = PRODUCT_ARRAY[i]
               const CUTOFF_PRICE = CUTOFF_ARRAY[i]
       
               //____ BLACK ELEMENT :  ______
       
               function createFloatingBadge(mode, status, ht = 160) {
                       const iconUrl = "https://kkapuria3.github.io/images/KK.png";
                       const iconUrl1 = "https://i.pinimg.com/600x315/cd/28/16/cd28168e19f7fdf9c666edd083921129.jpg"
                       const iconUrl2 = "https://brandlogovector.com/wp-content/uploads/2020/07/Discord-Logo-Icon-Small.png"
                       const iconUrl3 = "https://img.icons8.com/cotton/2x/source-code.png"
       
                       const script = document.createElement('script');
       
                       const $container = document.createElement("div");
                       const $bg = document.createElement("div");
       
                       const $link = document.createElement("a");
                       const $link1 = document.createElement("a");
                       const $link2 = document.createElement("a");
                       const $link3 = document.createElement("a");
       
                       const $img = document.createElement("img");
                       const $img1 = document.createElement("img");
                       const $img2 = document.createElement("img");
                       const $img3 = document.createElement("img");
       
                       const $text = document.createElement("P");
                       const $BAGDE_BORDER = document.createElement("P");
                       const $mode = document.createElement("P");
                       const $status1 = document.createElement("P");
       
                       script.setAttribute('type', 'text/javascript');
                       script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/brython@3.9.5/brython.min.js');
       
                       $link.setAttribute("href", "https://github.com/kkapuria3");
                       $link.setAttribute("target", "_blank");
                       $link.setAttribute("title", "RefreshNoBot");
       
                       $link1.setAttribute("href", "https://www.buymeacoffee.com/kapuriakaran");
                       $link1.setAttribute("target", "_blank");
                       $link1.setAttribute("title", "Buy Dev a Coffee");
       
                       $link2.setAttribute("href", "https://discord.gg/UcxcyxS5X8");
                       $link2.setAttribute("target", "_blank");
                       $link2.setAttribute("title", "Join Discord");
       
                       $link3.setAttribute("href", "https://www.buymeacoffee.com/kapuriakaran");
                       $link3.setAttribute("target", "_blank");
                       $link3.setAttribute("title", "View Source Code");
       
                       $img.setAttribute("src", iconUrl);
                       $img1.setAttribute("src", iconUrl1);
                       $img2.setAttribute("src", iconUrl2);
                       $img3.setAttribute("src", iconUrl3);
                       var MAIN_TITLE = ("Open Source Amazon-Bot v2.0   ◻️   TESTMODE: " + TESTMODE + "   ◻️   ITEM KEYWORD: " + AMAZON_PRODUCT_ID + "   ◻️   CUTOFF PRICE : " + CUTOFF_PRICE);
                       $BAGDE_BORDER.innerText = ("------------------------------------------------------------------------------------------------------------------------------------ ");
                       $text.innerText = MAIN_TITLE;
                       $mode.innerText = mode;
                       $status1.innerText = status;
       
                       $container.style.cssText = "position:fixed;left:0;bottom:0;width:950px;height:" + ht + "px;background: black; border: 1px solid #FFF";
                       $bg.style.cssText = "position:absolute;left:-100%;top:0;width:60px;height:350px;background:#1111;box-shadow: 0px 0 10px #060303; border: 1px solid #FFF;";
                       $link.style.cssText = "position:absolute;display:block;top:11px;left: 10px; z-index:10;width: 30px;height:30px;border-radius: 1px;overflow:hidden;";
                       $link1.style.cssText = "position:absolute;display:block;top:40px;left: 0px; z-index:10;width: 50px;height:50px;border-radius: 0px;overflow:hidden;";
                       $link2.style.cssText = "position:absolute;display:block;top:70px;left: 0px; z-index:10;width: 50px;height:50px;border-radius: 0px;overflow:hidden;";
                       $link3.style.cssText = "position:absolute;display:block;top:118px;left: 12px; z-index:10;width: 25px;height:25px;border-radius: 0px;overflow:hidden;";
                       $img.style.cssText = "display:block;width:100%";
                       $img1.style.cssText = "display:block;width:100%";
                       $img2.style.cssText = "display:block;width:100%";
                       $img3.style.cssText = "display:block;width:100%";
                       $text.style.cssText = "position:absolute;display:block;top:3px;left: 50px;background: transperant; color: white;";
                       $BAGDE_BORDER.style.cssText = "position:absolute;display:block;top:22px;left: 50px;background: transperant; color: green;";
                       $mode.style.cssText = "position:absolute;display:block;top:43px;left: 50px;background: transperant; color: white;";
                       $status1.style.cssText = "position:absolute;display:block;top:64px;left: 50px;background: transperant; color: white;";
                       //
                       //
                       $link.appendChild($img);
                       $link1.appendChild($img1);
                       $link2.appendChild($img2);
                       $link3.appendChild($img3);
                       $container.appendChild(script);
                       $container.appendChild($bg);
                       $container.appendChild($link);
                       $container.appendChild($link1);
                       $container.appendChild($link2);
                       $container.appendChild($link3);
                       $container.appendChild($text);
                       $container.appendChild($BAGDE_BORDER);
                       $container.appendChild($mode);
                       $container.appendChild($status1)
                       return $container;
               }
       
               //____ LOGIC :  ______
       
               // If your product URL has the AMAZON_PRODUCT_ID, we will run this logic. Simple.
               if (PRODUCT_URL.includes(AMAZON_PRODUCT_ID)) {
                       //____ BADGE UPDATE :  ______
                       var $badge = createFloatingBadge("Starting ..", "Init..");
                       document.body.appendChild($badge);
                       $badge.style.transform = "translate(0, 0)"
                       //____ DEBUG :  ______
                       console.log('Detected Product ID: ' + AMAZON_PRODUCT_ID);
                       console.log('Cutoff Price: ' + CUTOFF_PRICE);
       
                       //____ Get Product Title :  ______
                       var Product_Title = document.getElementsByClassName("a-size-large product-title-word-break");
                       console.log(Product_Title[0].innerHTML)
       
                       // If URL contains 'aod_redir', means we are checking for Extra Sellers, we will try to parse extra sellers in here
                       if (location.href.includes('aod')) {
                               //____ BADGE UPDATE :  ______
                               const $badge = createFloatingBadge('Extra Seller Offers Fetched | Checking offers ..', "Add to cart if price is below CUTOFF_PRICE ");
                               document.body.appendChild($badge);
                               $badge.style.transform = "translate(0, 0)"
                               let PRICES_BADGE = [];
                               console.log('START CHECKING SELLERS NOW ..')
                               GM_setValue('seller_buy', 'false');
                               //____ TIMEOUT :  _____
                               setTimeout(function() {
       
                                       console.log('Open extra sellers')
                                       //console.log(New_Sellers)
       
       
                                       // We are directly parsing all the sellers ADD TO CART BUTTONS
                                       var Seller_Buttons = document.getElementsByName("submit.addToCart");
                                       //console.log(Seller_Buttons.length)
                                       //console.log(Seller_Buttons)
       
                                       // We will loop over all the found buttons and then try to get ATC button where SELLER_PRICE is lower than CUTOFF_PRICE
                                       for (var i = 0; i < Seller_Buttons.length ; i++) {
       
                                               // Getting Seller Button Data
                                               var SELLER_BUTTON_DATA = Seller_Buttons.item(i)
                                               //console.log(Seller_Buttons[i].outerHTML)
                                               var SELLER_DATA = Seller_Buttons[i].outerHTML.split('aria-label="')[1].split('" aria-labell')[0]
                                               console.log(SELLER_DATA)
                                               // Getting Seller Price from Outter HTML of button
                                               var SELLER_PRICE = Seller_Buttons[i].outerHTML.match(NUMERIC_REGEXP).join('')
       
                                               // If SELLER_PRICE is less than CUTOFF_PRICE and SELLER_PRICE is Greater than 0 (to eliminate pseudo buttons)
                                               if (SELLER_PRICE < CUTOFF_PRICE && SELLER_PRICE > 0) {
       
                                                       const $badge = createFloatingBadge('PRICE MATCH FOUND..', SELLER_PRICE);
                                                       document.body.appendChild($badge);
                                                       // BUY WILL BE TRIGGERED HERE
                                                       console.log('LOW Price: ' + SELLER_PRICE + ' | ButtonID : ' + SELLER_BUTTON_DATA + ' | Button Number : ' + i + ' | Button TimeStamp' + Date.now() + '\n')
                                                       Seller_Buttons[i].click();
                                                       GM_setValue('seller_buy', 'true');
       
       
       
                                                       // If SELLER_PRICE IS HIGHER than CUTOFF_PRICE | Print the details to badge and move forward
                                               } else if (SELLER_PRICE > CUTOFF_PRICE && SELLER_PRICE > 0 && SELLER_PRICE < (CUTOFF_PRICE + 2000)) {
       
                                                       //refresh
                                                       //console.log('HIGH Price: ' + SELLER_PRICE + ' | ButtonID : ' + Seller_Buttons[i].outerHTML + ' | Button Number : ' + i + ' | Button TimeStamp' + Date.now() + '\n')
                                                       //console.log('Price is High')
                                                       var BADGE_SELLER_DETAILS = ' PRICE HIGHER | $:' + SELLER_PRICE + ' | ' + SELLER_DATA
                                                       PRICES_BADGE.push(BADGE_SELLER_DETAILS)
       
       
       
                                               }
                                               // Count Total Valid SELLER_BUTTON
                                               const TOTAL_ITEMS = 'Total Items : ' + PRICES_BADGE.length
       
                                               // Change hieght of badge based on total items retrieved
       
                                               if (i >= 11) {
                                                       const $badge = createFloatingBadge(TOTAL_ITEMS, PRICES_BADGE.join(""), 330);
                                                       document.body.appendChild($badge);
                                                       $badge.style.transform = "translate(0, 0)"
                                               } else if (i > 6) {
                                                       const $badge = createFloatingBadge(TOTAL_ITEMS, PRICES_BADGE.join(""), 250);
                                                       document.body.appendChild($badge);
                                                       $badge.style.transform = "translate(0, 0)"
                                               } else {
                                                       const $badge = createFloatingBadge(TOTAL_ITEMS, PRICES_BADGE.join(""));
                                                       document.body.appendChild($badge);
                                                       $badge.style.transform = "translate(0, 0)"
                                               }
       
       
                                       }
       
       
       
                               }, 5000)
       
                           setTimeout(function() {
                               const SELLER_BUY = GM_getValue('seller_buy');
                               if (SELLER_BUY === 'true') {
                               window.open("https://www.amazon.com/gp/cart/view.html?ref_=nav_cart", '_blank');
                               window.close()
                               } else {
                                   location.href = "https://www.amazon.com/dp/" + AMAZON_PRODUCT_ID + "/"}
       
                           }, 6000)
       
                               // MAIN PRODUCT PAGE OPERATIONS
                               // If price exists in MAIN BUY BOX or NEW BUY BOX then check if its less than CUTOFF or else go to sellers page
                       } else if (document.getElementById("price_inside_buybox") || document.getElementById("newBuyBoxPrice") || document.getElementsByClassName("a-offscreen")) {
       
                               if (document.getElementById("price_inside_buybox")) {
                                       var Title_Price = document.getElementById("price_inside_buybox").innerHTML;
                               }
                               if (document.getElementById("newBuyBoxPrice")) {
                                       Title_Price = document.getElementById("newBuyBoxPrice").innerHTML;
                               }
                              if ( document.getElementsByClassName("a-offscreen")) {
                                       Title_Price = document.getElementsByClassName("a-offscreen")[0].outerHTML.match(NUMERIC_REGEXP).join('')
                               }
       
       
                               // Parse the Title Price
                               Title_Price = Title_Price.match(NUMERIC_REGEXP).join('')
       
                               //console.log(Title_Price)
                               var Title_Price1 = 'Title Price : ' + Title_Price
                               const $badge = createFloatingBadge(Title_Price1, 'We will check resellers now ...');
                               document.body.appendChild($badge);
                               $badge.style.transform = "translate(0, 0)"
       
       
                               if (Title_Price <= CUTOFF_PRICE) {
                                       const $badge = createFloatingBadge(Title_Price1, 'Title Price below Cutoff ! Lets Buy this !!');
                                       document.body.appendChild($badge);
                                       $badge.style.transform = "translate(0, 0)"
                                       console.log('Buy Trigger')
                                       //document.getElementsByClassName("a-button-input attach-dss-atc")[0].click();
                                       setTimeout(function() {
                                               var soundData = new Audio("https://github.com/kkapuria3/BestBuy-GPU-Bot/blob/dev-v2.5-mem_leak_fix/resources/alert.mp3?raw=true");
                                               soundData.play()
                                               document.getElementsByClassName("a-button-input attach-dss-atc")[0].click();
                                                       setTimeout(function() {
                                                               window.open("https://www.amazon.com/gp/cart/view.html?ref_=nav_cart", '_blank');
       
       
                                                       }, 4000)
       
                                                       setTimeout(function() {
                                                           document.getElementById('attachSiNoCoverage-announce').click()
       
                                                       }, 3500)
       
       
                                                 }, 1000)
       
       
       
                               } else {
                                       setTimeout(function() {
                                               window.open("https://www.amazon.com/gp/offer-listing/" + AMAZON_PRODUCT_ID + "/ref=dp_olp_unknown_mbc", '_blank');
                                               window.close()
       
                                       }, 3000)
                               }
       
       
                       } else {
       
                               const $badge = createFloatingBadge('CDepth1: Title Price Empty', 'Lets check Resellers | Refreshing in 3s .. ');
                               document.body.appendChild($badge);
                               $badge.style.transform = "translate(0, 0)"
                               setTimeout(function() {
                                       location.href = "https://www.amazon.com/gp/offer-listing/" + AMAZON_PRODUCT_ID + "/ref=dp_olp_unknown_mbc";
                               }, 3000)
       
       
       
                       }
       
       
                       if (document.getElementById("outOfStock") && document.getElementsByClassName("aod-message-component") == null) {
       
                               const $badge = createFloatingBadge('CDepth2: Title Price Empty', 'Lets check Resellers | Refreshing in 2s .. ');
                               document.body.appendChild($badge);
                               $badge.style.transform = "translate(0, 0)"
                               setTimeout(function() {
       
                                       setTimeout(function() {
                                               console.log('timeout2');
                                               location.href = "https://www.amazon.com/gp/offer-listing/" + AMAZON_PRODUCT_ID + "/"
                                       }, 2000)
       
                                       var Message = document.getElementsByClassName("a-text-bold aod-no-offer-normal-font")[0].innerHTML;
                                       console.log(Message)
       
                                       const $badge = createFloatingBadge('Checking Resellers', Message);
                                       document.body.appendChild($badge);
                                       $badge.style.transform = "translate(0, 0)"
       
       
                               }, 5000) // << -- Contant Time | Do not change
       
       
                       }
                       // When no title price is found
                       if (document.getElementById("outOfStock") && document.getElementsByClassName("aod-message-component")) {
       
                               const $badge = createFloatingBadge('CDepth3: Title Price Empty', "Refreshing...");
                               document.body.appendChild($badge);
                               $badge.style.transform = "translate(0, 0)"
                               setTimeout(function() {
                                       console.log('timeout1')
       
                                       var Message = document.getElementsByClassName("a-text-bold aod-no-offer-normal-font")[0].innerHTML;
                                       console.log(Message)
       
                                       const $badge = createFloatingBadge('Checking Resellers', Message);
                                       document.body.appendChild($badge);
                                       $badge.style.transform = "translate(0, 0)"
       
       
       
                               }, 5000)
       
       
                       }
       
       
               }
       
       
       }
       
       //________________________________________________________________________
       
       //                 MAIN CODE : LOCAL HOST TESTING
       //________________________________________________________________________
       
       // If on http://localhost:8000/, then play the sound and send test request. Check solution for test request in your terminal
       if (document.URL.includes('http://localhost:8000/')) {
       
               var DA_TA_DA = new Audio("https://github.com/kkapuria3/Best-Amazon-Bot/blob/dev-v2.0/resources/dramatic-sound-effect.wav?raw=true");
               DA_TA_DA.play()
       
       
               GM_xmlhttpRequest({
                       method: "POST",
                       url: "http://localhost:8000/url/dddfleoy/Captcha_lkdgslujsl.jpg",
                       onload: function(response) {
       
                               console.log(response.response);
                               GM_setValue('TEST_RESPONSE', response.response);
       
       
                       }
               })
       }
       //________________________________________________________________________
       
       //                        MAIN CODE : DOG PAGES
       //________________________________________________________________________
       else if (document.getElementById('d').alt.includes('Dogs')) {
       
               console.log('Dogs of Amazon')
               setTimeout(function() {
       
                       location.href = 'https://www.amazon.com/gp/cart/view.html'
       
               }, 10000)
       
       
       }
       
       
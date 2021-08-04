// ==UserScript==
// @name     Amazon-RefreshNoBot
// @include  https://www.amazon.com/*
// @version      3.0
// @description  This aint bot, its RefreshNoBot
// @author       Karan Kapuria
// @grant        window.close
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addValueChangeListener

// Version Changelog
// 1.0-beta - Runs only Testmode.
// - Code is not complete commented.
// - No support for Amazon Captcha (Soft Ban) - Future support with local flask server
// - Dog Pages are not handled

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


let PRODUCT_ARRAY = ["B08R14HX34", "B096YQ6WVW", "B08V1ZJP93", "B08LF1CWT2", "B08R133PYZ"];
const CUTOFF_ARRAY = [500, 500, 650, 500, 500]; // No quotes

//____ REQUIRED FLAGS : TESTMODE OR BUY MODE _____________________________

const TESTMODE = "Yes" // TESTMODE = "No" will buy the card.

//____ MAIN CODE :  _____________________

const PRODUCT_URL = document.URL

const delay = ms => new Promise(res => setTimeout(res, ms));
const NUMERIC_REGEXP = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;

const RETRY_COUNT = 1

//____ MAIN CODE :  ___________ loop over product array and try to be nice

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
                var MAIN_TITLE = ("Open Source Amazon-Bot V1.0   ◻️   TESTMODE: " + TESTMODE + "   ◻️   ITEM KEYWORD: " + AMAZON_PRODUCT_ID + "   ◻️   CUTOFF PRICE : " + CUTOFF_PRICE);
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
                if (location.href.includes('aod_redir')) {
                        //____ BADGE UPDATE :  ______
                        const $badge = createFloatingBadge('Extra Seller Offers Fetched | Checking offers ..', "Add to cart if price is below CUTOFF_PRICE ");
                        document.body.appendChild($badge);
                        $badge.style.transform = "translate(0, 0)"
                        const PRICES_BADGE = [];
                        //____ TIMEOUT :  _____
                        setTimeout(function() {

                                console.log('Open extra sellers')
                                //console.log(New_Sellers)

                                // Get seller prices and seller buttons.
                                var Seller_Prices = document.getElementsByClassName("a-price-whole");
                                var Seller_Buttons = document.getElementsByClassName("a-button-input");
                                //____ BUTTONS LOOP - we are gonna be fine ~!
                                // We will loop over all the found buttons and then try to get valid ATC buttons
                                for (var i = 0; i < Seller_Prices.length; i++) {

                                        //console.log(slides.item(i).innerHTML);
                                        // Parsing the seller price
                                        var Seller_list_price = Seller_Prices.item(i).innerHTML
                                        // Assigning button to seller price
                                        var Seller_button_index = Seller_Buttons.item(i)
                                        Seller_list_price = Seller_list_price.match(NUMERIC_REGEXP).join('')
                                        // just some fancy console logs -- You made it here ??
                                        console.log(Seller_Buttons[i].outerHTML.includes('aria-label="Add to Cart'))
                                        console.log('Price: ' + Seller_list_price + ' | ButtonID : ' + Seller_button_index + ' | Button Number : ' + i + ' | Button TimeStamp' + Date.now() + '\n')
                                        //if (Seller_Buttons[i].outerHTML.includes('aria-label="Add to Cart'))


                                        if (Seller_list_price < CUTOFF_PRICE) {

                                                // BUG TRIGGER
                                                if (Seller_Buttons[i].outerHTML.includes('aria-label="Add to Cart') == true) {

                                                        Seller_Buttons[i].click();
                                                }


                                        } else {
                                                //refresh
                                                if (Seller_Buttons[i].outerHTML.includes('aria-label="Add to Cart') == true) {
                                                        console.log('Price is High')
                                                        var BADGE_SELLER_DETAILS = ' PRICE HIGHER | $:' + Seller_list_price + ' | BUTTON DATA : ' + Seller_button_index + ' | BUTTON NUMBER : ' + i + ' | TIMESTAMP : ' + Date.now() + '◻️ ◻️ ◻️ ◻️ ◻️'
                                                        PRICES_BADGE.push(BADGE_SELLER_DETAILS)
                                                }

                                        }

                                        setTimeout(function() {
                                                console.log(PRICES_BADGE)
                                                const TOTAL_ITEMS = 'Total Items : ' + PRICES_BADGE.length

                                                if (i >= 11) {
                                                        const $badge = createFloatingBadge(TOTAL_ITEMS, PRICES_BADGE, 330);
                                                        document.body.appendChild($badge);
                                                        $badge.style.transform = "translate(0, 0)"
                                                } else if (i >= 6) {
                                                        const $badge = createFloatingBadge(TOTAL_ITEMS, PRICES_BADGE, 250);
                                                        document.body.appendChild($badge);
                                                        $badge.style.transform = "translate(0, 0)"
                                                } else {
                                                        const $badge = createFloatingBadge(TOTAL_ITEMS, PRICES_BADGE);
                                                        document.body.appendChild($badge);
                                                        $badge.style.transform = "translate(0, 0)"
                                                }

                                        }, 1000)


                                }




                        }, 5000)
                        console.log('timeout2');

                        //setTimeout(function(){console.log("Main Product Page Redirect")},10000)
                        setTimeout(function() {
                                location.href = "https://www.amazon.com/dp/" + AMAZON_PRODUCT_ID + "/"
                        }, 10000)

                } else if (document.getElementById("price_inside_buybox") || document.getElementById("newBuyBoxPrice")) {

                        if (document.getElementById("price_inside_buybox")) {
                                var Title_Price = document.getElementById("price_inside_buybox").innerHTML;
                        }
                        if (document.getElementById("newBuyBoxPrice")) {
                                Title_Price = document.getElementById("newBuyBoxPrice").innerHTML;
                        }



                        Title_Price = Title_Price.match(NUMERIC_REGEXP).join('')

                        console.log(Title_Price)
                        var Title_Price1 = 'Title Price : ' + Title_Price
                        const $badge = createFloatingBadge(Title_Price1, 'We will check resellers now ...');
                        document.body.appendChild($badge);
                        $badge.style.transform = "translate(0, 0)"
                        GM_setValue('value', 'test')
                        const value = GM_getValue('value', 1)
                        console.log(value)

                        if (Title_Price <= 500) {

                                console.log('Buy Trigger')
                                document.getElementsByClassName("a-button-input attach-dss-atc")[0].click();
                                setTimeout(function() {
                                        var soundData = new Audio("https://github.com/kkapuria3/BestBuy-GPU-Bot/blob/dev-v2.5-mem_leak_fix/resources/alert.mp3?raw=true");
                                        soundData.play()
                                        document.getElementsByClassName("a-button-input")[1].click();

                                }, 1000)


                        } else {
                                setTimeout(function() {
                                        window.open("https://www.amazon.com/gp/offer-listing/" + AMAZON_PRODUCT_ID + "/ref=dp_olp_unknown_mbc", '_blank');
                                        window.close()

                                }, 3000)
                        }


                } else {

                        const $badge = createFloatingBadge('Title Price Empty', "Lets check Resellers");
                        document.body.appendChild($badge);
                        $badge.style.transform = "translate(0, 0)"
                        setTimeout(function() {
                                console.log('timeout1');


                                location.href = "https://www.amazon.com/gp/offer-listing/" + AMAZON_PRODUCT_ID + "/ref=dp_olp_unknown_mbc";
                        }, 3000)




                }


                if (document.getElementById("outOfStock") && document.getElementsByClassName("aod-message-component") == null) {

                        const $badge = createFloatingBadge('Title Price Empty', "Refreshing...");
                        document.body.appendChild($badge);
                        $badge.style.transform = "translate(0, 0)"
                        setTimeout(function() {
                                console.log('timeoutNull')

                                setTimeout(function() {
                                        console.log('timeout2');
                                        location.href = "https://www.amazon.com/gp/offer-listing/" + AMAZON_PRODUCT_ID + "/"
                                }, 2000)

                                var Message = document.getElementsByClassName("a-text-bold aod-no-offer-normal-font")[0].innerHTML;
                                console.log(Message)

                                const $badge = createFloatingBadge('Checking Resellers', Message);
                                document.body.appendChild($badge);
                                $badge.style.transform = "translate(0, 0)"




                        }, 5000)


                }
                if (document.getElementById("outOfStock") && document.getElementsByClassName("aod-message-component")) {

                        const $badge = createFloatingBadge('Title Price Empty', "Refreshing...");
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




        } else if (document.URL.includes('huc')) {
                console.log(document.URL)



                var soundData = new Audio("https://github.com/kkapuria3/BestBuy-GPU-Bot/blob/dev-v2.5-mem_leak_fix/resources/alert.mp3?raw=true");
                soundData.play()

                setTimeout(function() {


                        window.open('https://www.amazon.com/gp/buy/spc/handlers/display.html?hasWorkingJavascript=1', '_blank');
                        window.close();
                }, 3000)
        }

        /*             else if(document.getElementById("a-box a-alert a-alert-info a-spacing-base")) {

                        window.open('http://127.0.0.1:5000/', '_blank');


                        let SECRET_RETURNED = GM_getValue('SOLUTION');
                        console.log(SECRET_RETURNED)

                        setTimeout(function(){location.href = "https://www.amazon.com/dp/"+AMAZON_PRODUCT_ID+"/"},10000)


                    }
                      else if(location.href.includes('http://127.0.0.1:5000/')) {


                        const SOLUTION = 'test'

                        GM_xmlhttpRequest ( {
                            method:     "POST",
                            url:        "http://127.0.0.1:5000/url/",
                            onload:     function (response) {
                                SOLUTION = response.response
                                console.log (response.response);

                            }})

                        GM_setValue ('SOLUTION', SOLUTION);

                        let SECRET_RETURNED = GM_getValue('SOLUTION');
                        console.log(SECRET_RETURNED)

                          location





        }
         */

}
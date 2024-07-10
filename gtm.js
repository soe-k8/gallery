(function () {
    setTimeout(function () {
        var inputs = document.querySelectorAll('.fiat-form .view .MyInputView .inputView input');

        var currencyTxt = document.querySelector('.fiat-form .view .MyInputView .inputView .u-select .icon .flex1 .u-currency-data');

        var amountTrigger = document.querySelectorAll('.fiat-form .view .MyInputView .inputView .amount-trigger-wrap .amount-trigger-icon');

        var cryptoTrigger = document.querySelectorAll('.cryptoform .view .MyInputView .inputView .amount-trigger-wrap .amount-trigger-icon');
        var amountPay = 0;
        var buyBtn = document.querySelector('.submit-btn.btn-2');

        inputs[1].addEventListener("change", function () {
            amountPay = this.value;
        });

        for (var i = 0; i < amountTrigger.length; i++) {
            amountTrigger[i].addEventListener("click", function () {
                //addToCart(currencyTxt.innerText, inputs[0].value);
                amountPay = inputs[0].value;
            });

            cryptoTrigger[i].addEventListener("click", function () {
                //addToCart(currencyTxt.innerText, inputs[0].value);
                amountPay = inputs[0].value;
            });
        }

        buyBtn.addEventListener("click", function () {
            addToCart(currencyTxt.innerText, amountPay);
        });

    }, 2000);
})();

function addToCart(currency, value) {
    window.dataLayer.push({
        event: "buy_crypto", buyCurrency: currency, buyMethod: 'third party buying crypto', buyValue: value
    });

    var hostname = window.location.hostname;

    if (!hostname.includes("myk8")) {
        var obj = JSON.parse(localStorage.getItem('vuex'));
        var userCriteoId = obj.global.deviceId;
        var userCriteoEmail = "cs@mail-k8.io";

        if (obj.login.isLogin) {
            userCriteoId = obj.user.userInfo.id;
            userCriteoEmail = obj.user.userInfo.email;
        }

        window.criteo_q = window.criteo_q || [];
        var deviceType = /iPad/.test(navigator.userAgent) ? "t" : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(navigator.userAgent) ? "m" : "d";

        window.criteo_q.push(
            {event: "setAccount", account: 109111},
            {event: "setEmail", email: userCriteoEmail},
            {event: "setSiteType", type: deviceType},
            {event: "setCustomerId", id: userCriteoId},
            {event: "setRetailerVisitorId", id: userCriteoId},
            {
                event: "addToCart",
                item: [
                    {id: currency, price: value, quantity: 1}
                ]
            }
        )
        console.log("add to cart...")
        var transactionId = Date.now();
        window.criteo_q.push(
            {event: "setAccount", account: 109111},
            {event: "setEmail", email: userCriteoEmail},
            {event: "setSiteType", type: deviceType},
            {event: "setCustomerId", id: userCriteoId},
            {event: "setRetailerVisitorId", id: userCriteoId},
            {
                event: "trackTransaction", id: transactionId,
                item: [
                    {id: "buy_crypto", price: 1, quantity: 1}
                ]
            }
        );

    }

};

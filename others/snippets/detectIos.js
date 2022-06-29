// https://thewebdev.info/2022/02/11/how-to-detect-ipad-pro-as-ipad-with-javascript/

function isIOS() {
    if (/iPad|iPhone|iPod/.test(navigator.platform)) {
        return true;
    } else {
        return navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 2 &&
            /MacIntel/.test(navigator.platform);
    }
}

const isIpadOS = () => {
    return navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 2 &&
        /MacIntel/.test(navigator.platform);
}

const iPad = !!(navigator.userAgent.match(/(iPad)/)
    || (navigator.platform === "MacIntel" && typeof navigator.standalone !== "undefined"))

/*
During authentication flow in Safari, we have a case when in order to satisfy a condition policy, user needs to install the app on his device. Depending on the OS, we ask him to install different applications. Since on iPadOS User Agent in Safari is same as on MacOS Catalina, what is recommened way to distinguish OS on server side?



iPadOS:

Safari: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15



MacOS Catalina:

Safari: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36
*/
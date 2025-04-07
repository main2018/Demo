/*
 * @Author: guozongwei
 * @Date: 2019-08-22 12:12:21
 * @Remark:
 */

// import getAppVersion from "@utils/assist/getAppVersion";
// import isIos from "@utils/assist/isIos";
(function () {
  window.addEventListener("resize", function () {
    var MAX_WIDTH = 1280,
      htmlDom = document.querySelector("html"),
      htmlWidth = htmlDom.clientWidth,
      width = Math.min(htmlWidth, MAX_WIDTH),
      htmlFontSize = width / 3.75,
      preHtmlFontSize = htmlDom.style.fontSize || "";
    preHtmlFontSize = parseFloat(preHtmlFontSize);
    if (preHtmlFontSize && htmlFontSize == preHtmlFontSize) {
      return;
    }
    
    // var v = getAppVersion("8.36.0", "8.58.0");
    // // IOS端8.58.0 安卓端8.36.0
    // if ((v == "androidNew" || v == "iosNew") && !isIos() && window.stBridge) {
    //   window.stBridge.call("getClientFontScale", {
    //     success: (res) => {
    //       if (res > 1) {
    //         htmlFontSize = parseInt(htmlFontSize / res);
    //       }
    //       htmlDom.style.fontSize = htmlFontSize + "px";
    //     },
    //   });
    // } else {
      htmlDom.style.fontSize = htmlFontSize + "px";
    // }
  });
  var event = document.createEvent("HTMLEvents");
  event.initEvent("resize", false, false);
  window.dispatchEvent(event);
})();

// EmailJSのキーは、必ずご自身のものに置き換えてください！
const YOUR_SERVICE_ID = "service_g1f6w4q"; // EmailJSサービスID
const YOUR_PUBLIC_KEY = "user_w3qt2JUWCjZBvY7C3"; // EmailJSのパブリックキー
const NOTIFICATION_TEMPLATE_ID = "template_nzgtdzc"; // お問い合わせ通知用（築田様向け）
const AUTO_REPLY_TEMPLATE_ID = "template_ewb3rxi"; // 自動返信用（お客様向け）


// --- 1. SDKの読み込み完了を待機し、ボタンを有効化する処理 ---

function enableSendButton() {
    const submitButton = document.getElementById("submit-button");
    if (!submitButton) return;

    // EmailJS SDKが存在するかチェック
    if (typeof emailjs !== 'undefined') {
        // SDKが存在する場合: ボタンを有効化し、テキストを戻す
        submitButton.disabled = false;
        submitButton.innerHTML = "内容を確認して送信する";
        // 初期化をここで実行します
        emailjs.init(YOUR_PUBLIC_KEY);
        // ポーリングを停止
        clearInterval(checkInterval); 
    }
}

// 100msごとにSDKの読み込み完了をチェック (ポーリング)
const checkInterval = setInterval(enableSendButton, 100);

// --- 2. フォーム送信処理（EmailJS）の最終定義（onclickを使用） ---

window.sendEmail = function () {

    const contactForm = document.getElementById("contact-form");
    const submitButton = document.getElementById("submit-button");

    if (!contactForm) return; 
    
    // 必須項目のバリデーションチェック
    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return; 
    }

    // 💡 修正点：ここでは初期化は不要です。ボタンが有効化された時点で初期化済みです。
    if (typeof emailjs === 'undefined') {
        // 万が一、初期化されていない場合は、ボタンをリセットして中断
        submitButton.disabled = true;
        submitButton.innerHTML = "再読み込みしてください";
        return; 
    } 
    
    const formSection = document.querySelector(".form-section");
    const messageElement = document.getElementById("success-message");

    submitButton.disabled = true;
    submitButton.innerHTML = "送信中...";

    const formData = new FormData(contactForm);
    const templateParams = {};
    formData.forEach((value, key) => {
      templateParams[key] = value;
    });

    // Promise.allで2つのメール送信を確実に待機します
    Promise.all([
      emailjs.send(YOUR_SERVICE_ID, NOTIFICATION_TEMPLATE_ID, templateParams),
      emailjs.send(YOUR_SERVICE_ID, AUTO_REPLY_TEMPLATE_ID, templateParams)
    ])
    .then(
      function (responses) {
        console.log("ALL EMAIL SEND SUCCESS!", responses);
        if (formSection) formSection.style.display = "none";
        if (messageElement) {
          messageElement.classList.remove("hidden");
          messageElement.scrollIntoView({ behavior: "smooth" });
        }
      },
      function (error) {
        console.log("EMAIL SEND FAILED...", error);
        alert(
          "送信に失敗しました。お手数ですが、再度お試しいただくか、お電話ください。\nエラーコード: " + error.status
        );
        submitButton.disabled = false;
        submitButton.innerHTML = "内容を確認して送信する";
      }
    );
};
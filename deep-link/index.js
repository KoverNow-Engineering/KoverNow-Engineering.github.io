// Function to detect if the device is mobile
function isMobileDevice() {
  return navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

// Function to detect if the platform is iOS
function isIOS() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.userAgent === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

// Function to detect if the platform is Android
function isAndroid() {
  return /Android/.test(navigator.userAgent);
}

// Function to render download button
function renderPage() {
  if (isMobileDevice()) {
    const qrcodeContainerDiv = document.getElementById("qrcode-container");
    qrcodeContainerDiv.classList.add("hidden");

    let downloadButton = document.getElementById("downloadButton");
    if (isIOS()) {
      downloadButton.innerHTML =
        '<button onclick="navigateToAppStore()" class="get-app-button"><img src="../assets/document-copy.svg" alt="Copy icon"/><div class="get-app-text">Get the App</div></button>';
      // const meta = document.createElement("meta");
      // meta.name = "apple-itunes-app";
      // meta.content = `app-id=1601990797, app-argument=${constructIosDeepLinkParams()}`;

      // document.head.appendChild(meta);
    } else if (isAndroid()) {
      downloadButton.innerHTML =
        '<button onclick="navigateToGooglePlay()" class="get-app-button"><img src="../assets/document-copy.svg" alt="Copy icon"/><div class="get-app-text">Get the App</div></button>';
    } else {
      downloadButton.innerHTML =
        "This is a mobile device, but the platform is neither iOS nor Android.";
    }
  } else {
    const mobileContainerDiv = document.getElementById("mobile-container");
    mobileContainerDiv.classList.add("hidden");
    let qrcode = document.getElementById("qrcode");
    new QRCode(qrcode, window.location.href);
  }
}

// Function to navigate to App Store
async function navigateToAppStore() {
  const url = "https://apps.apple.com/sg/app/kovernow/id1601990797";
  await navigator.clipboard.writeText(constructIosDeepLinkParams());
  window.location.href = url;
}

// Function to navigate to Google Play
function navigateToGooglePlay() {
  window.location.href = `https://play.google.com/store/apps/details?id=com.kovernow.ludwig&referrer=${constructAndroidDeepLinkParams()}`;
}

function constructAndroidDeepLinkParams() {
  const currentUrl = new URL(window.location.href);

  const searchParams = currentUrl.searchParams;
  const source = searchParams.get("source") ?? "";
  const medium = searchParams.get("medium") ?? "";
  const content = searchParams.get("content") ?? "";
  const campaign = searchParams.get("campaign") ?? "";
  const anid = searchParams.get("anid") ?? "";

  return `utm_source%3D${source}%26utm_medium%3D${medium}%26utm_content%3D${content}%26utm_campaign%3D${campaign}%26anid%3D${anid}`;
}

function constructIosDeepLinkParams() {
  const currentUrl = new URL(window.location.href);

  const searchParams = currentUrl.searchParams;
  const source = searchParams.get("source") ?? "";
  const medium = searchParams.get("medium") ?? "";
  const content = searchParams.get("content") ?? "";
  const campaign = searchParams.get("campaign") ?? "";
  const anid = searchParams.get("anid") ?? "";

  return `utm_source=${source}&utm_medium=${medium}&utm_content=${encodeURIComponent(
    content
  )}&utm_campaign=${campaign}&anid=${anid}`;
}

window.addEventListener("load", (_ev) => {
  renderPage();
});

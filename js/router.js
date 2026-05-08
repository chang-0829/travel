// js/router.js

// 1. 定義路由對應表 (定義哪些網址對應哪些檔案)
const routes = {
    "/": "/pages/home.html",
    "/discover": "/pages/discover.html",
    "/mytrip": "/pages/mytrip.html",
    "/account": "/pages/account.html",
    "/admin": "/pages/admin.html",
    404: "/pages/404.html"
};

// 2. 核心路由函數：負責去抓取內容並塞進畫面
export const router = async () => {
    // 取得當前路徑 (例如: /, /discover)
    let path = window.location.pathname;
    
    // 防呆：如果是 index.html 也導向首頁
    if (path === '/index.html') path = '/';

    // 根據路徑決定要抓哪個檔案，找不到就給 404
    const targetFile = routes[path] || routes[404];

    const appContent = document.getElementById('app-content');
    const loader = document.getElementById('loader');

    // 顯示轉圈圈動畫
    if (loader) loader.classList.remove('hidden');

    try {
        // 去抓取對應的 HTML 檔案
        const response = await fetch(targetFile);
        
        if (!response.ok) throw new Error(`找不到頁面: ${targetFile}`);

        const html = await response.text();
        
        // 塞入畫面
        appContent.innerHTML = html;

        // 💡 關鍵步驟：重新執行所有被塞進來的腳本 (解決 Leaflet 和 Firebase 不會動的問題)
        executeScripts(appContent);

        // 更新 Navbar 按鈕的藍色狀態
        updateActiveMenu(path);
        
        // 畫面回到最上面
        window.scrollTo(0, 0);

    } catch (error) {
        console.error("載入頁面失敗:", error);
        appContent.innerHTML = `
            <div class="flex flex-col items-center justify-center h-[80vh]">
                <h1 class="text-6xl font-bold text-gray-300 mb-4">404</h1>
                <p class="text-xl text-gray-600 mb-6">哎呀！找不到您要的頁面</p>
                <a href="/" data-link class="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">返回首頁</a>
            </div>`;
    } finally {
        // 隱藏轉圈圈動畫
        if (loader) loader.classList.add('hidden');
    }
};

// 3. 導航函數 (給使用者點擊按鈕時呼叫)
export const navigateTo = (url) => {
    // 改變網址列，但不重新整理整個網頁
    history.pushState(null, null, url);
    // 呼叫路由引擎更新畫面內容
    router();
};

// --- 輔助函數 ---

// 💡 重新執行 DOM 裡面的 <script> (解決 SPA 痛點)
function executeScripts(container) {
    const scripts = container.querySelectorAll("script");
    scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");

        // 複製所有的屬性 (例如 src, type="module" 等)
        Array.from(oldScript.attributes).forEach((attr) => {
            newScript.setAttribute(attr.name, attr.value);
        });

        // 複製內部的 JavaScript 程式碼
        if (oldScript.innerHTML) {
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        }

        // 把舊的換成新的，瀏覽器就會去執行它
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}

// 更新側邊欄與底部列的按鈕狀態 (亮藍色)
function updateActiveMenu(currentPath) {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        // 我們當初在 navbar.html 塞了 data-route="discover" 之類的屬性
        // 這裡我們把它轉成路徑 "/discover" 來比對
        let routeName = link.getAttribute('data-route');
        let expectedPath = routeName === 'home' ? '/' : `/${routeName}`;

        // 先全部還原成灰色
        if (link.closest('aside')) { 
            link.classList.remove('bg-blue-50', 'text-blue-700', 'font-semibold');
            link.classList.add('text-gray-600');
        } else { 
            link.classList.remove('text-blue-600');
            link.classList.add('text-gray-500');
            const iconWrapper = link.querySelector('.icon-wrapper');
            // 我們把 svg 的藍色移除，因為這包在舊版的寫法裡比較複雜，先簡單移除 text-blue-600
        }

        // 如果路徑相符，就亮成藍色
        if (expectedPath === currentPath) {
            if (link.closest('aside')) { 
                link.classList.remove('text-gray-600');
                link.classList.add('bg-blue-50', 'text-blue-700', 'font-semibold');
            } else { 
                link.classList.remove('text-gray-500');
                link.classList.add('text-blue-600');
            }
        }
    });
}

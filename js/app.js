// js/app.js
import { router, navigateTo } from './router.js';

document.addEventListener("DOMContentLoaded", async () => {
    
    // 1. 載入共用的 Navbar
    try {
        const response = await fetch('/components/navbar.html');
        const navbarHtml = await response.text();
        document.getElementById('navbar-container').innerHTML = navbarHtml;
    } catch (error) {
        console.error("無法載入導覽列:", error);
    }

    // 2. 攔截所有帶有 data-link 的 <a> 標籤點擊事件
    document.body.addEventListener("click", e => {
        // 找到被點擊的最近的 <a> 標籤，而且它必須有 data-link 屬性
        const targetLink = e.target.closest("[data-link]");
        
        if (targetLink) {
            e.preventDefault(); // 阻止瀏覽器預設的整頁重新整理行為
            navigateTo(targetLink.href); // 交給 router.js 處理無痕換頁
        }
    });

    // 3. 監聽瀏覽器上一頁/下一頁按鈕 (讓上一頁功能在 SPA 裡也能正常運作)
    window.addEventListener("popstate", router);

    // 4. 初次載入時，執行一次路由來顯示當前網址該出現的畫面
    router();
});

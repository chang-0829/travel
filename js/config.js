// 這是全站共用的分類設定
// 如果未來需要新增、修改或刪除分類，請統一在這裡調整
export const LOCATION_MODES = [
 { id: 'spot', label: '景點', icon: 'fa-solid fa-camera', color: '#1890FF' },
 { id: 'food', label: '美食', icon: 'fa-solid fa-utensils', color: '#F4A261' },
 { id: 'shop', label: '購物', icon: 'fa-solid fa-bag-shopping', color: '#9D4EDD' },
 { id: 'hotel', label: '住宿', icon: 'fa-solid fa-hotel', color: '#2A9D8F' },
 { id: 'park', label: '樂園', icon: 'fa-solid fa-wand-magic-sparkles', color: '#E76F51' },
 { id: 'car_rental', label: '租車站', icon: 'fa-solid fa-key', color: '#2C3E50' },
 { id: 'station', label: '車站', icon: 'fa-solid fa-train', color: '#3E5C76' },
 { id: 'airport', label: '機場', icon: 'fa-solid fa-plane-arrival', color: '#3E5C76' },
 { id: 'other', label: '其他', icon: 'fa-solid fa-location-dot', color: '#8796A5' }
];

// 您也可以考慮將 Firebase 的共用變數放在這裡（視您的需求而定）
// export const FIREBASE_APP_ID = "travel-platform-v2";

import React, { useState, useEffect } from 'react';
import { Home, LayoutGrid, ClipboardSignature, BellRing, LogOut, Package, DollarSign, Smartphone, Menu, X, Monitor, Settings, Map } from 'lucide-react';

export default function OperatorLayout({ children, activeTab }: { children: React.ReactNode, activeTab: string }) {
  const [showSimulator, setShowSimulator] = useState(false);
  const [device, setDevice] = useState('6.5');
  const [scale, setScale] = useState(0.8);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDemoFrame, setIsDemoFrame] = useState(false);

  useEffect(() => {
    setIsDemoFrame(window.self !== window.top);
  }, []);

  const devices: Record<string, { name: string, w: number, h: number }> = {
    '6.5': { name: 'iPhone 13/14 (6.5")', w: 390, h: 844 },
    '6.7': { name: 'iPhone 14 Pro Max (6.7")', w: 430, h: 932 },
    '6.9': { name: 'Galaxy S20 Ultra (6.9")', w: 412, h: 915 },
    'ipad': { name: 'iPad Pro (11")', w: 834, h: 1194 }
  };

  const getTabClass = (tabName: string) => 
    activeTab === tabName 
      ? "flex items-center gap-3 px-3 py-2.5 bg-[#fff8ef] text-[#7d4b1a] rounded-md font-bold text-sm shadow-sm"
      : "flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-md font-medium text-sm transition-colors";

  const navLinks = [
    { id: 'dashboard', href: '/operator', icon: Home, label: 'Tổng quan' },
    { id: 'kyc', href: '/operator/kyc', icon: ClipboardSignature, label: 'Hồ sơ & eKYC' },
    { id: 'batch', href: '/operator/batch', icon: LayoutGrid, label: 'Quản lý Lô Nuôi' },
    { id: 'map', href: '/operator/map', icon: Map, label: 'Sơ đồ Trại (RAS)' },
    { id: 'harvest', href: '/operator/harvest', icon: Package, label: 'Thu hoạch & Đóng gói' },
    { id: 'settlement', href: '/operator/settlement', icon: DollarSign, label: 'Đối soát Doanh thu' },
  ];

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#171717] flex flex-col md:flex-row relative pb-16 md:pb-0">
      
      {/* ---------------- MOBILE HEADER ---------------- */}
      <header className="md:hidden flex items-center justify-between bg-white h-14 px-4 border-b border-gray-200 sticky top-0 z-40 shadow-sm shrink-0">
        <div className="flex items-center gap-2">
          <div className="grid w-8 h-8 place-items-center rounded-full bg-[#7d4b1a]">
            <img src="/assets/imgRegisterCrab.svg" alt="Crab" className="w-5 h-5" style={{filter: 'brightness(0) invert(1)'}} onError={(e) => e.currentTarget.style.display = 'none'} />
          </div>
          <strong className="text-[14px] font-extrabold text-[#7d4b1a] tracking-wider uppercase">CrabShare</strong>
        </div>
        <div className="flex items-center gap-4">
          <a href="/operator/alerts" className="relative">
            <BellRing className="w-5 h-5 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-[#b42318] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">2</span>
          </a>
          <button className="text-gray-700" onClick={() => alert('Mở phần Cài đặt (Settings)')}>
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* ---------------- MOBILE BOTTOM TAB BAR (APP STYLE) ---------------- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <a href="/operator" className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'dashboard' ? 'text-[#7d4b1a]' : 'text-gray-400'}`}>
          <Home className={`w-5 h-5 ${activeTab === 'dashboard' ? 'fill-current' : ''}`} />
          <span className="text-[10px] font-bold mt-1">Trang chủ</span>
        </a>
        <a href="/operator/batch" className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'batch' ? 'text-[#7d4b1a]' : 'text-gray-400'}`}>
          <LayoutGrid className={`w-5 h-5 ${activeTab === 'batch' ? 'fill-current opacity-20' : ''}`} />
          <span className="text-[10px] font-bold mt-1">Lô Nuôi</span>
        </a>
        <a href="/operator/map" className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'map' ? 'text-[#7d4b1a]' : 'text-gray-400'}`}>
          <Map className={`w-5 h-5 ${activeTab === 'map' ? 'fill-current opacity-20' : ''}`} />
          <span className="text-[10px] font-bold mt-1">Sơ đồ</span>
        </a>
        <a href="/operator/harvest" className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'harvest' ? 'text-[#7d4b1a]' : 'text-gray-400'}`}>
          <Package className={`w-5 h-5 ${activeTab === 'harvest' ? 'fill-current opacity-20' : ''}`} />
          <span className="text-[10px] font-bold mt-1">Thu hoạch</span>
        </a>
        <button onClick={() => setMobileMenuOpen(true)} className={`flex flex-col items-center justify-center w-full h-full ${mobileMenuOpen ? 'text-[#7d4b1a]' : 'text-gray-400'}`}>
          <Menu className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1">Menu</span>
        </button>
      </nav>

      {/* ---------------- MOBILE SLIDE-OUT MENU (FROM BOTTOM BAR) ---------------- */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex justify-end pb-16">
          <div className="absolute inset-[-100px] bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative w-[260px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 rounded-l-2xl overflow-hidden mt-14 border-t border-gray-100">
            <div className="p-5 flex items-center justify-between border-b border-gray-100 bg-[#fcfbf9]">
              <strong className="text-[#7d4b1a] font-extrabold text-lg">TÍNH NĂNG KHÁC</strong>
              <button onClick={() => setMobileMenuOpen(false)} className="bg-gray-200 rounded-full p-1"><X className="w-5 h-5 text-gray-700" /></button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
              <a href="/operator/kyc" className={getTabClass('kyc')}><ClipboardSignature className="w-5 h-5" />Hồ sơ & eKYC</a>
              <a href="/operator/settlement" className={getTabClass('settlement')}><DollarSign className="w-5 h-5" />Đối soát Doanh thu</a>
              
              <div className="border-t border-gray-100 my-4 pt-4"></div>
              
              <a href="/operator/alerts" className={`${getTabClass('alerts')} justify-between`}>
                <div className="flex items-center gap-3"><BellRing className="w-5 h-5" />Cảnh báo IoT</div>
                <span className="bg-[#b42318] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">2</span>
              </a>
              <a href="/" className="flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-md font-medium text-sm transition-colors mt-2">
                <LogOut className="w-5 h-5" />Đăng xuất
              </a>
            </nav>
          </div>
        </div>
      )}

      {/* ---------------- DESKTOP SIDEBAR ---------------- */}
      <aside className="w-64 bg-white border-r border-[#e5e7eb] hidden md:flex flex-col shadow-sm overflow-y-auto h-screen sticky top-0 shrink-0">
        <a href="/" className="h-20 flex-shrink-0 flex items-center justify-center border-b border-[#e5e7eb] hover:bg-gray-50 transition-colors">
          <div className="flex items-center">
            <div className="flex flex-col items-end pr-2 border-r border-[#7d4b1a] text-[#7d4b1a] leading-none">
              <strong className="text-[13px] font-medium tracking-[2px]">CRABSHARE</strong>
              <span className="mt-0.5 text-[9px] tracking-[1.5px]">VIETNAM</span>
            </div>
            <div className="grid w-8 h-8 place-items-center ml-2 p-1 rounded-full bg-[#7d4b1a]">
              <img src="/assets/imgRegisterCrab.svg" alt="Crab" className="w-5 h-5" style={{filter: 'brightness(0) invert(1)'}} onError={(e) => e.currentTarget.style.display = 'none'} />
            </div>
          </div>
        </a>
        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          <ul className="divide-y divide-gray-100">
            {navLinks.map(link => {
              const Icon = link.icon;
              return (
                <li key={link.id} className="py-1.5"><a href={link.href} className={getTabClass(link.id)}><Icon className="w-4 h-4" />{link.label}</a></li>
              )
            })}
            <li className="py-1.5">
              <a href="/operator/alerts" className={`${getTabClass('alerts')} justify-between`}>
                <div className="flex items-center gap-3"><BellRing className="w-4 h-4" />Cảnh báo</div>
                <span className="bg-[#b42318] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">2</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200 space-y-2">
          {/* NÚT BẬT DEMO MOBILE */}
          {!isDemoFrame && (
            <button onClick={() => setShowSimulator(true)} className="w-full flex items-center justify-center gap-2 px-3 py-3 bg-[#171717] text-white rounded-md font-bold text-sm shadow hover:bg-[#333] transition-colors mb-2">
              <Smartphone className="w-4 h-4" /> Bật Demo UI Mobile
            </button>
          )}
          <a href="/" className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-[#b42318] hover:bg-red-50 rounded-md font-medium text-sm transition-colors">
            <LogOut className="w-4 h-4" />Đăng xuất
          </a>
        </div>
      </aside>
      
      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-full">
        {children}
      </main>

      {/* ---------------- MOBILE SIMULATOR MODAL ---------------- */}
      {showSimulator && !isDemoFrame && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex flex-col backdrop-blur-sm">
          {/* Header Bar của Simulator */}
          <div className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-gray-800 bg-[#171717] text-white shrink-0 shadow-lg gap-2">
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
              <Monitor className="w-5 h-5 sm:w-6 sm:h-6 text-[#f4cf9c] shrink-0" />
              <h3 className="font-extrabold tracking-widest hidden lg:block">MOBILE UI SIMULATOR</h3>
              
              <select 
                value={device} 
                onChange={(e) => setDevice(e.target.value)}
                className="bg-black border border-gray-700 text-white font-bold text-xs sm:text-sm rounded px-2 sm:px-3 py-1.5 outline-none focus:border-[#f4cf9c] cursor-pointer"
              >
                {Object.entries(devices).map(([k, v]) => (
                  <option key={k} value={k}>{v.name} ({v.w}x{v.h})</option>
                ))}
              </select>

              <div className="hidden sm:flex items-center bg-black border border-gray-700 rounded px-1 py-1">
                <button onClick={() => setScale(s => Math.max(0.5, s - 0.1))} className="px-2 text-gray-400 hover:text-white font-bold">-</button>
                <span className="text-xs font-bold w-12 text-center text-[#f4cf9c]">{Math.round(scale * 100)}%</span>
                <button onClick={() => setScale(s => Math.min(1.5, s + 0.1))} className="px-2 text-gray-400 hover:text-white font-bold">+</button>
              </div>
            </div>
            
            <button onClick={() => setShowSimulator(false)} className="text-gray-300 hover:text-white flex items-center gap-2 text-xs sm:text-sm font-bold bg-gray-800 hover:bg-gray-700 px-3 sm:px-4 py-2 rounded transition-colors shrink-0">
              <X className="w-4 h-4" /> <span className="hidden sm:inline">Đóng Demo</span>
            </button>
          </div>
          
          {/* Khu vực chứa Phone Box */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-start">
            {/* Outer Wrapper: Giữ đúng kích thước sau khi scale để tránh bị gap */}
            <div 
              className="relative mt-4 sm:mt-6 transition-all duration-300 shrink-0"
              style={{ 
                width: (devices[device].w + 24) * scale, 
                height: (devices[device].h + 24) * scale 
              }}
            >
              {/* Inner Phone Frame: Scale từ góc top-left */}
              <div 
                className="absolute top-0 left-0 bg-black rounded-[3rem] p-3 shadow-2xl border border-gray-800 flex"
                style={{ 
                  width: devices[device].w + 24, 
                  height: devices[device].h + 24,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left'
                }}
              >
                {/* Nút nguồn & âm lượng giả lập */}
                <div className="absolute right-[-2px] top-32 w-1 h-16 bg-gray-800 rounded-r-lg"></div>
                <div className="absolute left-[-2px] top-24 w-1 h-12 bg-gray-800 rounded-l-lg"></div>
                <div className="absolute left-[-2px] top-40 w-1 h-12 bg-gray-800 rounded-l-lg"></div>

                <div className="w-full h-full rounded-[2.2rem] overflow-hidden bg-[#fcfbf9] relative border border-gray-900">
                  {/* Simulated Notch (tai thỏ) cho màn hình nhỏ */}
                  {device !== 'ipad' && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50"></div>
                  )}
                  
                  {/* Iframe nhúng app */}
                  <iframe 
                    src={window.location.pathname}
                    className="w-full h-full border-none"
                    title="Mobile View Simulator"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

const PcNav = () => {
  let MENUS = [];
  const location = useLocation();
  const { loginStatus, roleName } = useAuthStore();

  // 로고 이미지
  const PcLogo = 'https://crrxqwzygpifxmzxszdz.supabase.co/storage/v1/object/public/site_img/h_logo.png';

  // 회원 관련 페이지에서는 PC 네비게이션 숨김 (필요 시 Nav.jsx 규칙과 맞춰 조정)
  if (location.pathname.startsWith('/member')) return null;

  if (roleName === 'SYSTEM') {
    // 상담사 화면에서는 PC Nav 숨김 (상담사용 전용 레이아웃 사용)
    return null;
  }

  if (roleName === 'USER' || !roleName) {
    MENUS.push(
      { label: 'Home', to: '/' },
      { label: '상담', to: '/chat' },
      { label: '게시판', to: '/board' },
      { label: 'INFO', to: '/info' },
      { label: loginStatus ? '마이페이지' : '로그인', to: loginStatus ? '/mypage' : '/member/signin' },
    );
  } else if (roleName === 'ADMIN') {
    MENUS.push({ label: '마이페이지', to: '/admin' });
  } else {
    return null;
  }

  return (
    <nav className="hidden lg:block w-full bg-[#2563eb] top-0 left-0 z-50 shadow-sm">
      <div className="max-w-[1520px] mx-auto px-8">
        <div className="flex items-center justify-between h-24">
          {/* 로고 영역 */}
          <NavLink to="/" className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 w-24">
              {/* <span className="text-white text-[26px] leading-none font-bold">★</span>
              <span className="text-white text-[26px] font-bold tracking-tight">고민순삭</span> */}
              <img src={PcLogo} alt="로고" />
            </div>
          </NavLink>

          {/* 메뉴 */}
          <ul className="flex gap-8 items-center">
            {MENUS.map(({ label, to }) => {
              const isMyPage = label.includes('마이페이지') || label === '로그인';

              return (
                <li key={to}>
                  {isMyPage ? (
                    <NavLink
                      to={to}
                      className="px-6 py-2.5 bg-white text-[#2563eb] rounded-lg text-2xl! font-black hover:bg-blue-50 transition-all duration-200 shadow-md tracking-tight"
                      style={{ fontWeight: 900 }}
                    >
                      {label === '로그인' ? '로그인' : '마이페이지로 이동'}
                    </NavLink>
                  ) : (
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        `text-2xl! font-medium transition-all duration-200 px-1 py-1
                      ${isActive ? 'text-white font-bold' : 'text-white/90 hover:text-white'}`
                      }
                    >
                      {label}
                    </NavLink>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default PcNav;

import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { NavigationRail } from '../components/layout/NavigationRail';
import { TopBar } from '../components/layout/TopBar';
import { MobileNavigation } from '../components/layout/MobileNavigation';
import { MotionProvider } from '../components/motion/MotionProvider';
import { FULL_BLEED_PATHS } from '../lib/routeConfig';

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const fullBleed = FULL_BLEED_PATHS.includes(location.pathname);

  return (
    <div className="flex h-screen bg-canvas text-text-secondary overflow-hidden">
      <NavigationRail />
      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onOpenMobileMenu={() => setMobileOpen(true)} />
        <main className={`flex-1 overflow-y-auto bg-surface ${fullBleed ? 'p-0' : 'p-4 md:p-8 lg:p-10'}`}>
          <div className={fullBleed ? 'h-full' : 'max-w-[1400px] mx-auto'}>
            <MotionProvider>
              <Outlet />
            </MotionProvider>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

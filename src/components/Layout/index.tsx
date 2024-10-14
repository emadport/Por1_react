import SimpleLoading from "components/Loading";
import styles from "./Layout.module.scss";
import useVisibility from "hooks/useVisibility";
import React, { lazy, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { CurrentUserQuery } from "generated/graphql";
import { userRoutesArray, adminRoutesArray } from "utils/routesArray";
import { useTheme } from "hooks/theme.hook";

//Lazy load components

const Header = lazy(() => import("components/Header"));
const SideBar = lazy(() => import("components/Sidebar"));

interface LayoutPropsType {
  isHeaderVisible: boolean;
  signOut: () => void;
  user: CurrentUserQuery | undefined;
  userLoading: boolean;
}

const Loading = (
  <div>
    <SimpleLoading />
  </div>
);


function Layout({
  isHeaderVisible,
  signOut,
  user,
  userLoading
}: LayoutPropsType) {
  const { isVisible, setIsVisible, ref } = useVisibility(false);
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [finded, setFinded] = useState(true);
  const theme=useTheme()
  const location = useLocation();

useEffect(() => {
  if(!isDesktop){
 setIsVisible(false)
  }

}, [location.pathname])


  return (
    <div ref={ref} className={styles["layout-wrapper"]}>
      {isHeaderVisible && !isDesktop
        ? <div className="header-element">
      
            <React.Suspense fallback={Loading}>
              <Header
                setIsVisibleSidebar={setIsVisible}
                isVisibleSidebar={isVisible}
                theme={theme?.theme as string}
              />
            </React.Suspense>
          </div>
        : null}
      {isDesktop &&
        <React.Suspense fallback={<div  className="first-loading">{Loading}</div>}>
          <SideBar
            userLoading={userLoading}
            onNavigate={() => setIsVisible(false)}
            isDesktop={isDesktop}
            signOut={signOut}
            left={
              (isVisible || isDesktop) && location.pathname != "/" 
                ? "0"
                : "-100%"
            }
            user={user as CurrentUserQuery}
          />
        </React.Suspense>}
      <div style={{ position: "relative" }} className={styles["main-content"]}>
        <div className={styles["main-content__outlet"]}>
          <Outlet />
        </div>
        {!isDesktop &&
          <React.Suspense fallback={<div>{Loading}</div>}>
            <SideBar
              userLoading={userLoading}
              onNavigate={() => null}
              isDesktop={isDesktop}
              signOut={signOut}
              left={
                (isVisible || isDesktop) && location.pathname != "/" && finded
                  ? "0"
                  : "-100%"
              }
              user={user as CurrentUserQuery}
            />
          </React.Suspense>}
      </div>
    </div>
  );
}

export default Layout;

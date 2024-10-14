import React, { useEffect, useState } from "react";
import "./Header.scss";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdMenu } from "react-icons/io";

interface HeaderTypes {
  setIsVisibleSidebar: (val:boolean)=>void;
  isVisibleSidebar: boolean;
  theme:string
}
const Header = ({ setIsVisibleSidebar, isVisibleSidebar }: HeaderTypes) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleDocumentClick = (e: any) => {
      if (isModalOpen && !e.target.closest(".nav--hidden--mobile")) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isModalOpen]);

  function onSidebarOpen() {
    
    setIsVisibleSidebar(!isVisibleSidebar);
  }
  return (
    <header className="header">
      <div
        className="logo"
        onClick={onSidebarOpen}
        style={{ cursor: "pointer" }}>
        <IoMdMenu className="header-icons" />
      </div>
      <div className="nav--row">
        <nav>
          <ul>
            <li>
              <div className="nav--hidden--mobile"></div>
            </li>
            <li>
              <Link to="/">
                <AiOutlineHome className="header-icons" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

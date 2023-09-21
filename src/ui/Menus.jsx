/* eslint-disable react/prop-types */
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useClickOutSideModal } from "../hooks/useClickOutSideModal";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
const MenuContext = createContext();
export const Menus = ({ children }) => {
  const [openId, setIsOpenId] = useState("");
  const [position, setPosition] = useState();
  const open = setIsOpenId;
  const close = () => setIsOpenId("");
  const setPositionMenu = setPosition;
  const unSetPositionMenu = () => setPositionMenu();
  return (
    <MenuContext.Provider
      value={{
        openId,
        open,
        close,
        setPositionMenu,
        unSetPositionMenu,
        position,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

const Button = ({ children, icon, onClick }) => {
  const { close } = useContext(MenuContext);
  const handleOnClick = () => {
    console.log("CLICKED");
    onClick?.();
    close();
  };
  return (
    <li>
      <StyledButton onClick={handleOnClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
};
const List = ({ children, id }) => {
  const { openId, position, close } = useContext(MenuContext);
  const { containerRef } = useClickOutSideModal(close, true);
  if (openId !== id) return null;
  return createPortal(
    <StyledList
      ref={containerRef}
      position={{ ...position }}
    >
      {children}
    </StyledList>,
    document.body
  );
};
const Toggle = ({ id }) => {
  const { open, close, openId, setPositionMenu, unSetPositionMenu } =
    useContext(MenuContext);
  const handleClick = (e) => {
    const rect = e.target.closest("button").getBoundingClientRect();
    const isOpen = openId === "" || openId !== id;
    isOpen ? open(id) : close();
    isOpen
      ? setPositionMenu({
          x: window.innerWidth - rect.width - rect.x,
          y: rect.y + rect.height + 8,
        })
      : unSetPositionMenu();
  };
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical></HiEllipsisVertical>
    </StyledToggle>
  );
};

Menus.list = List;
Menus.button = Button;
Menus.toggle = Toggle;
Menus.menu = Menu;

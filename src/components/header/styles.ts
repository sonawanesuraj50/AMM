import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background: rgb(51, 49, 45);
    box-shadow: rgb(171 133 115 / 16%) 0px 2px 10px;
    padding: 0 50px 0 50px;
`;

export const HeaderText = styled.div`
    color: rgb(255, 205, 132);
    font-weight: 700;
    font-size: 24px;
`;

export const MenuOptions = styled(Link)`
    color: rgb(255, 205, 132);
    font-weight: 500;
    font-size: 18px;
    text-decoration: none;
`;

export const AccountAddress = styled.div`
    color: rgb(255, 205, 132);
    font-weight: 500;
    font-size: 18px;
`;

export const ConnectButton = styled.button`
    cursor: pointer;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    padding: 10px;
    border-radius: 10px;
    font-size: 18px;
    line-height: 27px;
    transition: 300ms all;
    background-color: rgb(255, 205, 132);
    border: 1px solid rgba(255, 205, 132, 0.44);
    color: rgb(114, 47, 13);
    font-weight: 700;
`;
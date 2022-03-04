import styled from "styled-components";

export const WalletContainer = styled.div`
    width: 500px;
    height: 270px;
`;

export const WalletHeaderText = styled.div`
    color: black;
    font-weight: 700;
`;

export const WalletSubText = styled.div`
    color: black;
    font-weight: 500;
`;

export const WalletIconContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
`;

interface walletIcon {
    active: boolean;
}

export const WalletIcon = styled.div<walletIcon>`
    display: flex;
    margin: auto;
    text-align: center;
    flex-direction: column;
    border: ${(props) => props.active ? "1px solid red" : "none"};
    padding: 10px;
    border-radius: 15px;
    width: 110px;
    cursor: pointer;

    img {
        height: 70px;
        margin-bottom: 10px;
    }
`;

export const ConnetcConditions = styled.div`
    margin-top: 20px;
`;

export const ConnetcButton = styled.button`
    cursor: pointer;
    margin-top: 20px;
    width: 100%;
    height: 50px;
    background-color: #ff5703;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    padding: 0;
    border-radius: 10px;
    font-family: "MessinaSans-Bold";
    font-size: 18px;
    line-height: 27px;
    color: #ffffff;
    transition: 300ms all;

    :disabled {
        cursor: not-allowed;
        opacity: 0.4;
    }
`;
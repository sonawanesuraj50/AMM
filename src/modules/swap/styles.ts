import styled from "styled-components";

export const ExchangeContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: calc(100vh - 50px);
`;

export const HeaderText = styled.div`
    color: rgb(255, 205, 132);
    font-weight: 700;
    font-size: 24px;
`;

export const InputContainer = styled.div`
    max-width: 420px;
    width: 100%;
    background: rgb(50, 41, 37);
    box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
    border-radius: 20px;
    padding: 25px;
`;

export const SwapContainer = styled.div`
    border-radius: 20px;
    background-color: rgb(45, 36, 31);
    padding: 20px;
`;

export const DownArrow = styled.img`
    display: flex;
    margin: auto;
    padding: 20px;
`;

export const InputTextContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const InputText = styled.div`
    color: white;
`;

export const TokenContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    input {
        background-color: rgb(45, 36, 31);
        border: none;
        height: 35px;
        color: white;
        font-size: 20px;
        outline: none;
    }

    select{
        background-color: rgb(45, 36, 31);
        border: none;
        height: 35px;
        color: white;
        font-size: 16px;
        outline: none;

        option{

        }
    }
`;

export const ErrorMessage = styled.div`
    color: red;
`;


export const Maxbutton = styled.button`
    background-color: rgb(255, 205, 132);
    border: 1px solid rgb(255, 205, 132);
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    margin-right: 0.5rem;
    color: rgb(114, 47, 13);
`;

export const SwapButton = styled.button`
    background-color: rgb(255, 205, 132);
    border: 1px solid rgb(255, 205, 132);
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    margin-right: 0.5rem;
    color: rgb(114, 47, 13);
    width: 100%;
    height: 40px;
    margin-top: 20px;
`;



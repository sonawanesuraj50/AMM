import styled from "styled-components";

interface ModalBodyProps {
  show: boolean;
}

export const ModalContainer = styled.div<ModalBodyProps>`
  display: ${(props) => (props.show ? "block" : "none")};
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalBody = styled.div`
  box-shadow: 0px 10px 0px #d8d8d8;
  background: #ffffff;
  border-radius: 20px;
  padding: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 1100px) {
    width: 94%;
    padding: 15px;
    max-height: 90%;
    overflow: scroll;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const CloseBtn = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  width: 24px;
  height: 24px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1100px) {
    top: 15px;
    right: 15px;
  }
`;

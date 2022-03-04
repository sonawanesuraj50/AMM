import { IMAGES } from "images";
import * as Styles from "./style";

interface Props {
  show: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

function CustomModal(props: Props)  {
  const { show, children, handleClose } = props;

  return (
    <Styles.ModalContainer show={show}>
      <Styles.ModalBody>
        <Styles.CloseBtn onClick={handleClose}>
          <img src={IMAGES.modalCloseBtn.default} alt="close" />
        </Styles.CloseBtn>
        {children}
      </Styles.ModalBody>
    </Styles.ModalContainer>
  );
};

export default CustomModal;

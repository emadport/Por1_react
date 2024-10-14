import * as React from "react";
import "./Modall.scss";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Label from "@mui/material/StepLabel";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (e: boolean) => boolean | undefined;
  children: React.ReactNode;
}
function Modall({ isModalOpen, setIsModalOpen, children }: ModalProps) {
  const handleClose = () => setIsModalOpen(false);

  return (
    <Modal
    style={{margin:'auto'}}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className="modal-container"
      open={isModalOpen}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade
        style={{ backgroundColor: "#383838", width: "100%" }}
        in={isModalOpen}
      >
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
  );
}
export default Modall;

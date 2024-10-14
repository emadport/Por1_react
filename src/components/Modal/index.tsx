import * as React from "react";
import "./Modal.scss";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (e: boolean) => void;
  children: React.ReactNode;
  title?: string;
  bgColor?: string;
  width?: string;
  withBorders?: boolean;
}
const modalStyle = {
  borderRadius: "5px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,

  p: 4,
};

const ModalComponent = ({
  isModalOpen,
  setIsModalOpen,
  children,
  title,
  width,
  bgColor,
}: ModalProps) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className="modal-container"
      closeAfterTransition>
      <Fade in={isModalOpen}>
        <Box
          sx={{
            ...modalStyle,
            bgcolor: bgColor ? bgColor : "#181818",
            width: width ? width : "inherit",
            
          }}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "#fff", margin: "auto", textAlign: "center" }}>
            <div style={{ margin: "1rem" }}>{title}</div>
          </Typography>

          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalComponent;

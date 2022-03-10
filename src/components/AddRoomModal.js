import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  FormControl,
  Input,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import "./AddRoomModal.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddRoomModal = ({ roomsRefFireBase }) => {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const addRoom = () => {
    const roomId = roomsRefFireBase.push().key;
    const newRoom = {
      id: roomId,
      name: roomName,
      description: description,
    };
    roomsRefFireBase
      .child(roomId)
      .set(newRoom)
      .then(() => console.log("new room"))
      .catch((err) => console.log(err));
  };
  return (
    <div className="AddRoomModal">
      <span onClick={handleOpen}>+</span>
      <Dialog
        open={modalOpen}
        TransitionComponent={Transition}
        OnClose={handleClose}
        basic
        keepMounted
      >
        <DialogTitle>Add a chat room</DialogTitle>
        <DialogContent>
          <form onSubmit={addRoom}>
            <FormControl fullWidth={true}>
              <Input
                placeholder="Name"
                value={roomName}
                type="text"
                onChange={(evt) => setRoomName(evt.target.value)}
                fullWidth={true}
              />
            </FormControl>
            <FormControl fullWidth={true}>
              <Input
                placeholder="Description"
                value={description}
                type="text"
                onChange={(evt) => setDescription(evt.target.value)}
                fullWidth={true}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>
            <span style={{ paddingRight: "8px" }}>Cancel</span>
            <CheckIcon />
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              addRoom();
              handleClose();
            }}
          >
            <span style={{ paddingRight: "8px" }}>Add</span>
            <CancelIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddRoomModal;

import React, { useState } from "react";
import { Modal, Header, Form, Button, Icon } from "semantic-ui-react";
import "./AddRoomModal.css";

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
      description: description
    };
    roomsRefFireBase
      .child(roomId)
      .set(newRoom)
      .then(() => console.log("new room"))
      .catch(err => console.log(err));
  };
  return (
    <div className="AddRoomModal">
      <Modal
        trigger={<span onClick={handleOpen}>+</span>}
        open={modalOpen}
        OnClose={handleClose}
        basic
        size="small"
      >
        <Header content="Add a chat room" />
        <Modal.Content>
          <Form onSubmit={addRoom}>
            <Form.Field>
              <input
                placeholder="Name"
                value={roomName}
                onChange={evt => setRoomName(evt.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <input
                placeholder="Description"
                value={description}
                onChange={evt => setDescription(evt.target.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" inverted onClick={handleClose}>
            <Icon name="remove" />
            Cancel
          </Button>
          <Button
            color="green"
            inverted
            onClick={() => {
              addRoom();
              handleClose();
            }}
          >
            <Icon name="checkmark" />
            Add
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default AddRoomModal;

import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import { Modal } from "../../ui/Modal";

export const AddCabin = () => {
  return (
    <div>
      <Modal>
        <Modal.open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.open>
        <Modal.window name="cabin-form">
          <CreateCabinForm></CreateCabinForm>
        </Modal.window>
      </Modal>
    </div>
  );
};

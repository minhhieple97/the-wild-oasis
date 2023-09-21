/* eslint-disable react/prop-types */
import styled from "styled-components";
import { HiTrash, HiSquare2Stack, HiPencil } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import { Modal } from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import { Menus } from "../../ui/Menus";
const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  /* transform: scale(1.66666) translateX(-2px); */
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id, name, maxCapacity, discount, regularPrice, image, description } =
    cabin;
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const handleDuplicateCabin = () => {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      discount,
      regularPrice,
      image,
      description,
    });
  };
  return (
    <Table.row columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Img src={image}></Img>
      <Cabin>{name}</Cabin>
      <div>Fits up tp {maxCapacity} guest</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : `&mdash;`}
      <div>
        <Modal>
          <Menus.menu>
            <Menus.toggle />
            <Menus.list>
              <Menus.button
                disabled={isCreating}
                onClick={handleDuplicateCabin}
                icon={<HiSquare2Stack />}
              >
                Duplicate
              </Menus.button>
              <Modal.open opens="edit">
                <Menus.button icon={<HiPencil></HiPencil>}>Edit</Menus.button>
              </Modal.open>
              <Modal.open opens="delete">
                <Menus.button icon={<HiTrash></HiTrash>}>Delete</Menus.button>
              </Modal.open>
            </Menus.list>
            <Modal.window name="edit">
              <CreateCabinForm cabinToEdit={cabin}></CreateCabinForm>
            </Modal.window>
            <Modal.window name="delete">
              <ConfirmDelete
                resource={name}
                onConfirm={() => deleteCabin(id)}
                disabled={isDeleting}
              ></ConfirmDelete>
            </Modal.window>
          </Menus.menu>
        </Modal>
      </div>
    </Table.row>
  );
}

export default CabinRow;

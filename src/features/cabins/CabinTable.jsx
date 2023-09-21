import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import { Menus } from "../../ui/Menus";
function CabinTable() {
  const { cabins, isLoading } = useCabins();
  if (isLoading) return <Spinner></Spinner>;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.header>
        <Table.body
          data={cabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id}></CabinRow>}
        ></Table.body>
      </Table>
    </Menus>
  );
}

export default CabinTable;

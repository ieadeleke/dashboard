import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const DeliveryDetails = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-medium text-2xl">Delivery Details</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Boat Name</TableHead>
            <TableHead>Number of Injury</TableHead>
            <TableHead>Number of Missing</TableHead>
            <TableHead>Boat capacity</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        {Array(5)
          .fill(0)
          .map((item) => (
            <TableBody key={item.BoatName} className="bg-white">
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <p>Test 12</p>
                  </div>
                </TableCell>
                <TableCell>Test 3</TableCell>

                <TableCell>Test 5</TableCell>
                <TableCell>Test 7</TableCell>
                <TableCell></TableCell>
                <TableCell>Test 3</TableCell>
              </TableRow>
            </TableBody>
          ))}
      </Table>
    </div>
  );
};

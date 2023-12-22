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
        <TableHeader className="bg-primary rounded-xl">
          <TableRow>
            <TableHead className="text-black">Destination</TableHead>
            <TableHead className="text-black">Tracking ID</TableHead>
            <TableHead className="text-black">Weight (kg)</TableHead>
            <TableHead className="text-black">Status</TableHead>
            <TableHead className="text-black">Departure Date</TableHead>
            <TableHead className="text-black">Arrival Date</TableHead>
            <TableHead className="text-black">Delivery Time</TableHead>
          </TableRow>
        </TableHeader>

        {Array(5)
          .fill(0)
          .map((item) => (
            <TableBody key={item.BoatName} className="bg-white">
              <TableRow>
                <TableCell>Test 3</TableCell>
                <TableCell>Test 3</TableCell>
                <TableCell>Test 3</TableCell>
                <TableCell>Test 3</TableCell>
                <TableCell>Test 5</TableCell>
                <TableCell>Test 7</TableCell>
                <TableCell>Test 3</TableCell>
              </TableRow>
            </TableBody>
          ))}
      </Table>
    </div>
  );
};

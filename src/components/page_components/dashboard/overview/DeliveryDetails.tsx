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
      <h1 className="font-medium text-2xl">Recent Transactions</h1>

      <Table>
        <TableHeader className="bg-primary rounded-xl">
          <TableRow>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Payment ID</TableHead>
            <TableHead className="text-white">LGA (kg)</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Transaction Date</TableHead>
            <TableHead className="text-white">Agent Name</TableHead>
            <TableHead className="text-white">Lorem Ipsum</TableHead>
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

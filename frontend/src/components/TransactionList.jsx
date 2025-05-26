'use client';

import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export const TransactionList = ({ transactionData = [], onEdit, onDelete, loadBudgetData }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Amount</TableHead>
          {!loadBudgetData && (<TableHead>Description</TableHead>) }
          <TableHead>Date</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactionData.length > 0 ? (
          transactionData.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell>₹{transaction.amount}</TableCell>
            {!loadBudgetData && <TableCell>{transaction.description}</TableCell>}
              <TableCell>
               {!loadBudgetData ?new Date(transaction.date).toLocaleDateString()
               : new Date(transaction.month).toLocaleDateString()}
              </TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell className="flex justify-end gap-2">
                {onEdit && (
                  <Button
                    variant="outline"
                    onClick={() => onEdit(transaction)}
                  >
                    Edit
                  </Button>
                )}
               { onDelete && (
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(transaction._id)}
                  >
                    Delete
                  </Button>

               )}
                  
              
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-muted-foreground">
              No transactions found. Add one to get started.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

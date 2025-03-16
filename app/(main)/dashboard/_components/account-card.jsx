"use client";
import { ArrowUpRight, ArrowDownRight, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
import { useEffect } from "react";
import { updateDefaultAccount, deleteAccount } from "@/actions/account"; // Import delete function
import { formatCurrency } from "@/lib/utils";

export function AccountCard({ account, onDeleteSuccess }) {
  const { name, type, balance, id, isDefault } = account;

  // Fetch hook for updating default account
  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  // Fetch hook for deleting account
  const {
    loading: deleteLoading,
    fn: deleteAccountFn,
    data: deletedAccount,
    error: deleteError,
  } = useFetch(deleteAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault();
    if (isDefault) {
      toast.warning("You need at least one default account");
      return;
    }
    await updateDefaultFn(id);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this account?"
    );
    if (!confirmDelete) return;

    await deleteAccountFn(id);
    if (onDeleteSuccess) onDeleteSuccess(id); // Update UI after deletion
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  useEffect(() => {
    if (deletedAccount?.success) {
      toast.success("Account deleted successfully");
    }
  }, [deletedAccount]);

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError.message || "Failed to delete account");
    }
  }, [deleteError]);

  return (
    <Card className="hover:shadow-md transition-shadow group relative">
      {/* Delete Button in Top-Right Corner */}
  <button
    onClick={handleDelete}
    disabled={deleteLoading}
    className="absolute top-2 right-2 text-gray-500 hover:text-red-600 transition-all"
  >
    <Trash className="w-4 h-4" />
  </button>
      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium capitalize">
            {name}
          </CardTitle>
          <Switch
            checked={isDefault}
            onClick={handleDefaultChange}
            disabled={updateDefaultLoading}
          />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
          <p className="text-xs text-muted-foreground">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            Income
          </div>
          <div className="flex items-center">
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}

export default AccountCard;

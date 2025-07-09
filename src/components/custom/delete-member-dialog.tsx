import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { useState } from "react"
import { Trash2 } from "lucide-react"
import { useDeleteMemberMutation } from "@/api/member"
const DeleteMemberDialog = ({ memberId }: { memberId: string }) => {
  const [deleteContest, { isLoading }] = useDeleteMemberMutation()
  const [open, setOpen] = useState(false)
  async function onSubmit() {
    try {
      await deleteContest({
        memberId,
      }).unwrap()
      setOpen(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash2 className="size-6 hover:bg-orange-500 hover:text-white py-1 rounded cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xoá thành viên này?</DialogTitle>
          <DialogDescription>Cân nhắc kĩ trước khi xoá nhé</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Huỷ</Button>
          </DialogClose>
          <Button
            disabled={isLoading}
            onClick={onSubmit}
            className="bg-red-500">
            Xoá
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteMemberDialog

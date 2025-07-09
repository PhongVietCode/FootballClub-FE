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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import FormInput from "../common/form-input"
import { Form } from "../ui/form"
import { useEffect, useState } from "react"
import { useUpdateMemberMutation } from "@/api/member"
import {
  updateMemberSchema,
  type UpdateMemberSchema,
} from "@/schemas/member/UpdateMember"
import type { MemberProfile } from "@/types/member"
import { Pencil } from "lucide-react"
const UpdateMemberDialog = ({ member }: { member: MemberProfile }) => {
  const [updateContest, { isLoading }] = useUpdateMemberMutation()
  const [open, setOpen] = useState(false)
  const form = useForm<UpdateMemberSchema>({
    resolver: zodResolver(updateMemberSchema),
    defaultValues: {
      elo: String(member.elo),
      name: member.name,
    },
  })
  async function onSubmit(values: UpdateMemberSchema) {
    try {
      await updateContest({
        memberId: member.id,
        updateSchema: {
          elo: Number(values.elo),
          name: values.name,
        },
      }).unwrap()
      setOpen(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    form.reset({ elo: String(member.elo), name: member.name })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member.id, member.name])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pencil className="size-6 hover:bg-orange-500 hover:text-white py-1 rounded cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Điều chỉnh thành viên trong tổ chức của bạn</DialogTitle>
          <DialogDescription>Cân nhắc kĩ trước khi thay đổi</DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form className="space-y-4">
              <FormInput
                control={form.control}
                label="Tên:"
                name="name"
                placeholder=""
              />
              <FormInput
                control={form.control}
                label="Elo:"
                name="elo"
                type="number"
                placeholder="(1-10)"
              />
            </form>
          </Form>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Huỷ</Button>
          </DialogClose>
          <Button
            disabled={isLoading || !form.formState.isValid}
            onClick={form.handleSubmit(onSubmit)}>
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateMemberDialog

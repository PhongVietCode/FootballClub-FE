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
import {
  createMemberSchema,
  type CreateMemberSchema,
} from "@/schemas/member/CreateMember"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCreateMemberMutation } from "@/api/member"
import FormInput from "../common/form-input"
import { Form } from "../ui/form"
import { useOrgId } from "@/hooks/use-org"
import { useState } from "react"
const CreateMemberDialog = () => {
  const [createMember, { isLoading }] = useCreateMemberMutation()
  const [open, setOpen] = useState(false)
  const orgId = useOrgId()
  const form = useForm<CreateMemberSchema>({
    resolver: zodResolver(createMemberSchema),
    defaultValues: {
      elo: "",
      name: "",
    },
  })
  async function onSubmit(values: CreateMemberSchema) {
    try {
      await createMember({
        ...values,
        elo: Number(values.elo),
        organizationId: orgId,
      }).unwrap()
      setOpen(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Thêm thành viên</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm thành viên mới vào tổ chức của bạn</DialogTitle>
          <DialogDescription>
            Vui lòng cân nhắc elo trước khi tạo.
          </DialogDescription>
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

export default CreateMemberDialog

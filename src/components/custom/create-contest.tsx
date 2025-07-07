import { useState } from "react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog"
import {
  createContestSchema,
  type CreateContestSchema,
} from "@/schemas/contest/CreateContest"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useOrgId } from "@/hooks/use-org"
import { useCreateContestMutation } from "@/api/contest"
import { Form } from "../ui/form"
import FormInput from "../common/form-input"
import ChooseAddress from "./choose-address"

const CreateContestDialog = () => {
  const [open, setOpen] = useState(false)
  const orgId = useOrgId()
  const [createContest, { isLoading }] = useCreateContestMutation()
  const form = useForm<CreateContestSchema>({
    resolver: zodResolver(createContestSchema),
    defaultValues: {
      addressId: "",
      dateTime: "",
      orgId: orgId,
      teamCount: "",
    },
  })
  async function onSubmit(values: CreateContestSchema) {
    try {
      await createContest({ ...values, orgId }).unwrap()
      setOpen(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Tạo trận mới</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tạo trận đấu mới</DialogTitle>
          <DialogDescription>
            Vui lòng điền đầy đủ thông tin dưới đây.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form className="space-y-4">
              <FormInput
                control={form.control}
                label="Ngày:"
                name="dateTime"
                type="datetime-local"
              />
              <FormInput
                control={form.control}
                label="Số đội:"
                name="teamCount"
                placeholder=""
                type="number"
              />
            </form>
            <div className="my-4" />
            <ChooseAddress
              onValueChange={(value) => {
                form.setValue("addressId", value, { shouldValidate: true })
              }}
            />
          </Form>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Huỷ</Button>
          </DialogClose>
          <Button disabled={isLoading} onClick={form.handleSubmit(onSubmit)}>
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateContestDialog

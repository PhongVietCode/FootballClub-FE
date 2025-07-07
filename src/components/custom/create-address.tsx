import { useCreateAddressMutation } from "@/api/address"
import { useOrgId } from "@/hooks/use-org"
import {
  createAddressSchema,
  type CreateAddressSchema,
} from "@/schemas/address/CreateAddress"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "../ui/form"
import FormInput from "../common/form-input"
import { Button } from "../ui/button"
type Props = {
  onDone: () => void
}
const CreateAddress = (props: Props) => {
  const orgId = useOrgId()
  const [createAddress, { isLoading }] = useCreateAddressMutation()

  const form = useForm<CreateAddressSchema>({
    resolver: zodResolver(createAddressSchema),
    defaultValues: {
      address: "",
      name: "",
      orgId: orgId,
    },
  })
  async function onSubmit(values: CreateAddressSchema) {
    try {
      await createAddress({ ...values, orgId }).unwrap()
      props.onDone()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="border-gray-100 border-1 border-solid px-2 py-1 rounded-md">
      <div className="py-1 text-[15px] text-gray-500 text-center">
        Tạo địa chỉ mới
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormInput
            control={form.control}
            label="Tên"
            name="name"
            placeholder=""
          />
          <FormInput control={form.control} label="Địa chỉ" name="address" />
          <Button
            type="submit"
            disabled={!form.formState.isValid || isLoading}
            className="w-full">
            Xác nhận
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateAddress

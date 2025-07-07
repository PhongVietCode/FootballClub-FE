import { useCreateOrgMutation } from "@/api/org"
import { useGetProfileQuery } from "@/api/user"
import FormInput from "@/components/common/form-input"
import ListRender from "@/components/common/list-render"
import Loading from "@/components/common/loading"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useAppDispatch } from "@/hooks"
import { createOrgSchema, type CreateOrgSchema } from "@/schemas/org/CreateOrg"
import { chooseProfile } from "@/store/userSlice"
import type { OrgProfile } from "@/types/org"
import { zodResolver } from "@hookform/resolvers/zod"
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"

const Org = () => {
  const { data, isLoading } = useGetProfileQuery()
  const [isCreate, setIsCreate] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  return (
    <div className="size-full flex flex-col justify-center px-4">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isCreate ? (
            <div className="flex flex-row gap-5">
              <ArrowLeft
                className="p-1 hover:bg-gray-100 rounded-full cursor-pointer"
                onClick={() => {
                  setIsCreate(false)
                }}
              />
              <div>
                <CreateOrg />
              </div>
            </div>
          ) : (
            <>
              <ListRender
                data={data?.result.organizations}
                renderItem={(item, index) => (
                  <OrgItem
                    key={index}
                    item={item}
                    index={index}
                    onClick={() => {
                      dispatch(chooseProfile(item))
                      navigate("/home")
                    }}
                  />
                )}
                emptyMessage="Bạn chưa thuộc tổ chức nào"
              />
              <Button
                type="submit"
                className="w-full my-4"
                onClick={() => {
                  setIsCreate(true)
                }}>
                Tạo tổ chức mới
              </Button>
            </>
          )}
        </>
      )}
    </div>
  )
}
const CreateOrg = () => {
  const [createOrg, { isLoading }] = useCreateOrgMutation()
  const dispatch = useAppDispatch()
  const form = useForm<CreateOrgSchema>({
    resolver: zodResolver(createOrgSchema),
    defaultValues: {
      name: "",
    },
  })
  async function onSubmit(values: CreateOrgSchema) {
    try {
      const res = await createOrg(values).unwrap()
      dispatch(chooseProfile(res.result))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Form {...form}>
      <div className="mb-2 font-bold text-4xl">
        Tạo <span className="text-primary">tổ chức</span> của riêng bạn
      </div>
      <div className="mb-4 italic text-red-600">
        Lưu ý: Tổ chức có ít hơn 2 thành viên sẽ bị tự động xoá sau 30 ngày.
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col">
        <FormInput
          control={form.control}
          label="Tên tổ chức"
          name="name"
          placeholder=""
        />

        <Button
          type="submit"
          disabled={!form.formState.isValid || isLoading}
          className="self-center w-[50%]">
          Tạo mới
        </Button>
      </form>
    </Form>
  )
}
const OrgItem = ({
  item,
  onClick,
  index,
}: {
  item: OrgProfile
  index: number
  onClick: () => void
}) => {
  return (
    <div
      className="bg-white mb-2 rounded-md p-3 flex flex-rowm gap-4 cursor-pointer hover:shadow-md shadow-sm hover:-translate-y-1 transition-transform"
      onClick={onClick}
      key={index}>
      <Avatar className="shadow-sm rounded-full flex flex-col justify-center items-center size-12">
        <AvatarImage src={item.logoUrl || ""} />
        <AvatarFallback>ORG</AvatarFallback>
      </Avatar>
      <div className="flex flex-row flex-1 justify-between items-center">
        <span className="font-semibold text-lg">{item.name}</span>
        <div>
          Vai trò: <span>{item.member.role}</span>
        </div>
      </div>
    </div>
  )
}

export default Org

import { useCreateUserMutation } from "@/api/user"
import {
  userCreateSchema,
  type UserCreateSchema,
} from "@/schemas/user/UserCreateSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import FormInput from "@/components/common/form-input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"
const SignIn = () => {
  const [signIn, { isLoading }] = useCreateUserMutation()
  const form = useForm<UserCreateSchema>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      fullName: "",
      password: "",
    },
  })
  function onSubmit(values: UserCreateSchema) {
    console.log(values)
    signIn(values)
  }
  return (
    <div className="size-full flex flex-col justify-center  px-4">
      <div className="flex flex-col my-12 gap-4">
        <span className="text-4xl font-bold">
          <span className="text-blue-600">Đăng kí </span>thành viên
        </span>
        <span className="italic">
          Chào mừng bạn đến với Football Club, hãy trở thành 1 phần của đội bóng
          hoàng gia.
        </span>
      </div>
      <div className="w-[70%] sefl-center shadow-md px-4 py-5 rounded-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormInput
              control={form.control}
              label="Tên"
              name="fullName"
              placeholder="Nguyễn Văn X"
            />
            <FormInput
              control={form.control}
              label="Mật khẩu"
              name="password"
              type="password"
            />
            <Button
              type="submit"
              disabled={isLoading || !form.formState.isValid}
              className="w-full">
              Đăng kí
            </Button>
          </form>
        </Form>
      </div>
      <div className="my-6">Đã có tài khoản?<Link to={"/login"} className="text-blue-600 font-semibold ml-2">Đăng nhập ngay</Link></div>
      
    </div>
  )
}

export default SignIn

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import FormInput from "@/components/common/form-input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router"
import { useLoginMutation } from "@/api/auth"
import { loginSchema, type LoginSchema } from "@/schemas/user/LoginSchema"
import { useAppDispatch } from "@/hooks"
import { setToken } from "@/store/authSlice"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [login, { isLoading }] = useLoginMutation()
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  })
  async function onSubmit(values: LoginSchema) {
    try {
      dispatch(setToken(""))
      const res = await login(values).unwrap()
      dispatch(setToken(res.result.token))
      navigate("/org")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="size-full flex flex-col justify-center items-center">
      <span className="text-4xl font-bold">
        <span className="text-blue-600">Đăng nhập </span>
      </span>
      <div className="w-[70%] sefl-center shadow-md px-4 py-5 rounded-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormInput
              control={form.control}
              label="Tên"
              name="userName"
              placeholder=""
            />
            <FormInput
              control={form.control}
              label="Mật khẩu"
              name="password"
              type="password"
            />
            <Button
              type="submit"
              disabled={!form.formState.isValid || isLoading}
              className="w-full">
              Đăng nhập
            </Button>
          </form>
        </Form>
      </div>
      <span className="my-6">
        Chưa có tài khoản?
        <Link to={"/signin"} className="font-semibold ml-2 text-blue-600">
          Đăng kí
        </Link>
      </span>
    </div>
  )
}

export default Login

import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"

type Props<T extends FieldValues, TName extends FieldPath<T>> = {
  control: ControllerProps<T, TName>["control"]
  name: TName
  placeholder?: string
  label: string
  type?: React.HTMLInputTypeAttribute | undefined
}
const FormInput = <T extends FieldValues, TName extends FieldPath<T>>(
  props: Props<T, TName>
) => {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              type={props.type}
            />
          </FormControl>
          {/* <FormDescription>This is your public display name.</FormDescription> */}
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  )
}

export default FormInput

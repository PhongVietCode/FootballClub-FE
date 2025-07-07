import { useLazyGetOrgDetailQuery } from "@/api/org"
import { useOrgId } from "@/hooks/use-org"
import { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import CreateAddress from "./create-address"
import { Plus } from "lucide-react"
type Props = {
  onValueChange: (value: string) => void
}
const ChooseAddress = (props: Props) => {
  const orgId = useOrgId()
  const [isCreate, setIsCreate] = useState(false)
  const [getOrgDetail, { data }] = useLazyGetOrgDetailQuery()
  useEffect(() => {
    if (orgId) {
      getOrgDetail({ id: orgId }, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgId])
  return (
    <>
      {isCreate ? (
        <div className="relative">
          <div
            className="absolute m-2 p-[1px] text-gray-400 rotate-45 right-0 hover:bg-gray-100 rounded-full cursor-pointer"
            onClick={() => {
              setIsCreate(false)
            }}>
            <Plus size={20} />
          </div>
          <CreateAddress onDone={() => setIsCreate(false)} />
        </div>
      ) : (
        <>
          {data && (
            <Select
              onValueChange={(value) => {
                if (value === " ") {
                  setIsCreate(true)
                } else {
                  props.onValueChange(value)
                }
              }}>
              <div className="text-[14px] mb-1 font-semibold">Địa chỉ:</div>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn 1 địa chỉ" />
              </SelectTrigger>
              <SelectContent>
                {data.result.addresses.map((item, index) => (
                  <SelectItem value={item.id} key={index}>
                    <div className="max-w-[325px] truncate flex-1">
                      {item.name}: {item.address}
                    </div>
                  </SelectItem>
                ))}
                <SelectItem value=" ">Tạo địa chỉ mới</SelectItem>
              </SelectContent>
            </Select>
          )}
        </>
      )}
    </>
  )
}
export default ChooseAddress

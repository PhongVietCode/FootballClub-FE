import type React from "react"

type Props<T> = {
  data?: T[] | null
  renderItem: (item: T, index: number) => React.ReactNode
  emptyMessage?:string
}
const ListRender = <T,>(props: Props<T>) => {
  if (!props.data) {
    return <div>{props.emptyMessage || "Không thể tải danh sách"}</div>
  }
  if(props.data.length == 0){
    return <div>Danh sách trống</div>
  }
  return (
    <>
      {props.data.map((item, index) => (
        <>{props.renderItem(item, index)}</>
      ))}
    </>
  )
}

export default ListRender

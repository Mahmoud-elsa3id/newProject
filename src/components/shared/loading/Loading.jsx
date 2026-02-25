import { Spinner } from "@heroui/react"


export default function Loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner classNames={{label: "text-foreground mt-4"}} label="Loading.." labelColor="primary" size="lg" variant="gradient" />

    </div>
  )
}

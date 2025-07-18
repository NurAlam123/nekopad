import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="h-svh w-full flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );
}

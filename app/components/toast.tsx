import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ToastType } from "../types/toast.type";

interface ToastProps {
  message: string;
  type: ToastType;
}

export default function Toast(props: ToastProps) {
  const { message, type } = props;

  const handleToastType = () => {
    switch (type) {
      case ToastType.Success:
        return <CheckCircleIcon className="h-5 w-5 text-[#a0ffa0]" />;
      case ToastType.Warning:
        return <ExclamationCircleIcon className="h-5 w-5 text-[orange]" />;
      case ToastType.Error:
        return <ExclamationCircleIcon className="h-5 w-5 text-[#f67474]" />;
      default:
        return null;
    }
  };

  return (
    <div className="toast toast-end">
      <div className="alert">
        {handleToastType()}
        <span>{message}</span>
      </div>
    </div>
  );
}

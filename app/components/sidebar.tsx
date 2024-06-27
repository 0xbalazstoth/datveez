import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar(props: SidebarProps) {
  const { children } = props;

  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="menu bg-white border border-r-2 text-base-content min-h-full w-80 pt-5">
        <div className="flex flex-col">
          <div>
            <header className="text-[25px] text-base-200 font-bold">
              Toolbox
            </header>

            <div className="text-base-content mt-5 flex flex-row gap-2 items-center">
              <div className="flex flex-col justify-center items-center">
                <div className="bg-orange-400 w-[2px] h-5"></div>
                <InformationCircleIcon className="w-6 h-6 text-orange-400" />
                <div className="bg-orange-400 w-[2px] h-5"></div>
              </div>
              <div>
                <p className="text-base-200 text-balance">
                  The toolbox contains a list of methods that can be applied to
                  the uploaded file. Each method has a specific purpose.
                </p>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

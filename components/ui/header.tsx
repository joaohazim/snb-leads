import Image from "next/image";

export function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="Open Doors Logo" 
              width={120} 
              height={35}
              className="object-contain"
            />
          </div>
          <div className="flex items-center gap-3 pr-4 lg:pr-0">
            <span className="text-sm text-slate-600 hidden sm:block">Parceria exclusiva com</span>
            <Image 
              src="/images/snb-logo.png" 
              alt="SNB Engenharia" 
              width={80} 
              height={30}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
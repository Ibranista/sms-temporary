import logo from "@/assets/logos/TamSMS.svg";
import Image from "next/image";

export function Logo() {
  return (
    <div className="relative w-[100%] h-[5rem] aspect-1">
      <Image
        src={logo}
        fill
        className="dark:hidden"
        alt="NextAdmin logo"
        role="presentation"
        quality={100}
      />
      {/* 
      <Image
        src={darkLogo}
        fill
        className="hidden dark:block"
        alt="NextAdmin logo"
        role="presentation"
        quality={100}
      /> */}
    </div>
  );
}

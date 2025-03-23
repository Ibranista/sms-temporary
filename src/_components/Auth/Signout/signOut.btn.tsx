import { signOut } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";

export default function SignOut({ setIsOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>> }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSignOut = async () => {
        setIsLoading(true);
        try {
            await signOut();
            setIsOpen(false);
        } catch (error) {
            console.error("Error signing out:", error);
            setIsLoading(false);
        }
    };

    return (
        <button onClick={handleSignOut} disabled={isLoading} className="text-base font-medium">
            {isLoading ? "Signing out..." : "Sign Out"}
        </button>
    );
}

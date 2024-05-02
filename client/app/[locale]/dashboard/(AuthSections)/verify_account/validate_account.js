"use client";
import { verify_account } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Validate_account({ children }) {
    // getting the code from the URL if any
    const getCode = useSearchParams().get("auth_code");
    // set the result
    const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
        const verifyAndRedirect = async () => {
            let loadingToastId = null;
            try {
                loadingToastId = toast.loading("Verifying account...", {
                    render: "verification failed",
                    autoClose: 5000,
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
                const result = await verify_account(getCode);
                // we only need to show the error message, if it is successfull we will redirect the user
                if (result && result.isVerified == false) {
                    setShowComponent(!result.isVerified);
                    toast.update(loadingToastId, {
                        render: result.msg || "verification failed",
                        type: "error",
                        isLoading: false,
                        autoClose: 5000,
                        position: "top-center",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        toastId: "customId",
                        transition: Slide,
                    });
                }
            } catch (error) {
                toast.update(loadingToastId, {
                    render: error || "unexpected error found",
                    type: "error",
                    isLoading: false,
                    autoClose: 5000,
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    toastId: "customId",
                    transition: Slide,
                });
            }
        };
        // we are going to run this function if we have the code
        if (getCode) {
            verifyAndRedirect();
        } else {
            setShowComponent(true);
        }
    }, []);

    // todo set a nice animation of loading
    return <>{showComponent ? children : <p>loading...</p>}</>;
}

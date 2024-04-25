"use client";
import { verify_account } from "@/lib/actions";
import { useSearchParams, redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Validate_account({ children }) {
    // preparing the router to redirect the user in case is verified
    const router = useRouter();
    // getting the code from the URL if any
    const getCode = useSearchParams().get("auth_code");
    // handling the state of the content show or not show
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const verifyAndRedirect = async () => {
            const result = await verify_account(getCode);
            return result;
        };

        // we can send the request to the server ONLY if the code is passed in the URL
        if (getCode) {
            verifyAndRedirect()
                .then((result) => {
                    if (result.isVerified) {
                        router.push("/dashboard");
                    } else {
                        // if error then show the content of this page
                        setShowContent(true);
                        // show the toast message with the error
                        toast.error(result.msg, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Slide,
                        });
                    }
                })
                .catch((error) => {
                    // if error then show the content of this page
                    setShowContent(true);
                    // show the toast message with the error
                    toast.error(error.msg, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Slide,
                    });
                });
        } else {
            // if no auth code then just show the content of this page
            setShowContent(true);
        }
    }, []);

    // if showContent true then show the content
    if (showContent) {
        return (
            <>
                <ToastContainer limit={1} />
                {children}
            </>
        );
    }
    // show the message Validating Account meanwhile
    // todo include the loading page component here
    return (
        <>
            <p>loading..</p>
        </>
    );
}

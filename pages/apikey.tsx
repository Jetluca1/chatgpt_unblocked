import { AnimatePresence, motion } from "framer-motion";
import { request } from "http";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/DropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";

const Home: NextPage = (props: any) => {
  const [key, setKey] = useState<string>("");

  var handleReset = () => {
    Array.from(document.querySelectorAll("textarea")).forEach(
      (input) => (input.value = "")
    );
  };

  return (
    <div className="flex max-w-10xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Twitter Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px- mt-12 sm:mt-8">
        <h1 className="sm:text-6xl text-4xl font-bold text-black">
          Add Your <span className="linear-wipe">API Key</span>
          {/* {props.user ? <div>user :{props.user.displayName}</div> : null}
          <div>user :{ JSON.stringify(props.FBuser.requests?.map((r:any)=> r.Res)) }</div> */}
        </h1>
        <div className="mt-2 mb-5 text-xl">
          (You only have to do this once, but it cannot be done on networks that
          block the api key link)
        </div>
        {/*simple submit button */}

        {/* 
        <p className="m-6 text- text-3xl">
          <span className="font-bold">Step 1: </span>
          <span className="linear-wipe ">
            <button
              className=""
              onClick={() => props.signIn()}
              // className="bg-black rounded-xl max-w-2xl text-white font-medium px-4 py-2 sm:mt-5  hover:bg-black/80 w-full"
            >
              Sign In With Google ↗
            </button>
          </span>
        </p> */}

        <div className="pt-8 text-3xl border-b-2 border-t-2 pb-8">
          <div className="flex items-center w-192 ">
            <div className="font-bold w-3/12 text-5xl ">Step 1: </div>
            <div className=" w-9/12">
              {props.user ? (
                <div>
                  <div>Signed In:</div>
                  <div>
                    {" "}
                    Hello,{" "}
                    <span className="linear-wipe">
                      {props.user.displayName}
                    </span>
                  </div>
                  <button className="underline" onClick={() => props.signOut()}>
                    Sign out:
                  </button>
                </div>
              ) : (
                <button
                  className="text-5xl py-6 linear-wipe "
                  onClick={() => props.signIn()}
                  // className="bg-black rounded-xl max-w-2xl text-white font-medium px-4 py-2 sm:mt-5  hover:bg-black/80 w-full"
                >
                  Sign In With Google ↗
                </button>
              )}
            </div>
          </div>
        </div>
        {/* step2 */}
        <div className="pt-4 text-3xl border-b-2 pb-4">
          <div className="flex items-center w-192">
            <div className="font-bold w-3/12 text-4xl ">Step 2: </div>
            <div className=" w-9/12">
              <div>Go to</div>
              <a
                target="_blank"
                href="https://beta.openai.com/account/api-keys"
              >
                <span className="linear-wipe">
                  https://beta.openai.com/account/api-keys
                </span>{" "}
              </a>
            </div>
          </div>
        </div>
        {/* step3 */}
        <div className="pt-4 text-3xl border-b-2 pb-4">
          <div className="flex items-center w-192">
            <div className="font-bold w-3/12 text-4xl ">Step 3: </div>
            <div className=" w-9/12">
              <div>Click "Create new secret key" and copy your api key.</div>
            </div>
          </div>
        </div>
        {/* step4 */}

        <div className="pt-4 text-3xl border-b-2 pb-4">
          <div className="flex items-center w-192">
            <div className="font-bold w-3/12 text-4xl ">Step 4: </div>
            <div className=" w-9/12">
              {/* text area that allows user to input their key */}

              <textarea
                // value={prompt}
                onChange={(e) => setKey(e.target.value)}
                rows={1}
                className="w-full rounded-md border-black shadow-sm focus:ring-black my-5"
                placeholder={"Paste Your API Key Here"}
              />

              <button
                className="bg-white border-black border-2 rounded-xl text-black px-4 py-2 sm:mt-5  hover:bg-gray-300/80 w-full"
                onClick={() => {
                    props.user?
                        key?
                        (props.updateKey(key),
                        handleReset(),
                        toast.success("Key Updated"))
                        :
                        toast.error("Please Enter a Key")
                        :
                    toast.error("Please Sign In")
                }}
              >
                {" "}
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* step5 */}
        <div className="pt-4 text-3xl border-b-2 pb-4">
          <div className="flex items-center w-192">
            <div className="font-bold w-3/12 text-4xl ">Step 5: </div>
            <div className=" w-9/12">
              <div>Go back to the Homepage and do a test request. If it doesn't load, then the key is invalid or you may have copied it wrong.</div>
              <div>Press <span className=" "><button onClick={()=>
              props.user?
              (props.updateKey(''),
              toast.success("Key Deleted")):
                toast.error("Please Sign In")
            
            } className="underline">here</button></span> to delete your API key and default to complementary tokens.</div>
            </div>
          </div>
        </div>

        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

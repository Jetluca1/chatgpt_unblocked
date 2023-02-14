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
import Link from "next/link";

const Home: NextPage = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [key, setKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [vibe, setVibe] = useState<VibeType>("Professional");
  const [generatedBios, setGeneratedBios] = useState<String>("");

  // console.log("Streamed response: ", generatedBios);

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);
    // var p = prompt + ". The response shouldnt be longer than 120 words."

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt:prompt,
        key:props.FBuser.api_key,
      }),
    });
    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    var temp = "";
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
      temp += chunkValue;
    }
    console.log("Streamed response: ", temp);
    // props.addReq({ Req: prompt, Time: getTimestamp(), Res: temp })

    props.addReq({ Req: prompt, Time: getTimestamp(), Res: temp });

    setLoading(false);
  };
  const getTimestamp = () => {
    var logTimestamp = new Date();
    // var timezoneOffset = logTimestamp.getTimezoneOffset();
    // logTimestamp.setMinutes(logTimestamp.getMinutes() + timezoneOffset);
    // // return {year: logTimestamp.getFullYear(), month: logTimestamp.getMonth(), day: logTimestamp.getDate(), hour: logTimestamp.getHours(), minute: logTimestamp.getMinutes(), second: logTimestamp.getSeconds()}
    return logTimestamp.toISOString();
  };

  // function checkUsedTokens that iterates through props.user.requests how many characters were used in the req and res, but only for requests in the last 24 hours
  function checkUsedTokens() {
    console.log("props.FBuser.requests: ", props.FBuser.requests);
    var usedTokens = 0;
    var now = new Date();

    var fiveMinutesAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    // var timezoneOffset = fiveMinutesAgo.getTimezoneOffset();
    // fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() + timezoneOffset);
    console.log("fiveMinutesAgo: ", fiveMinutesAgo);
    props.FBuser.requests?.map((r: any) => {
      console.log(new Date(r.Time) > fiveMinutesAgo);
      if (new Date(r.Time) > fiveMinutesAgo) {
        usedTokens += r.Req.length + r.Res.length;
      }
    });
    console.log("used tokens: ", usedTokens / 4);
    return usedTokens / 4;
  }

  // useEffect(() => {
  //   checkUsedTokens()
  // }, [props.FBuser.requests]);
  return (
    <div className="flex max-w-10xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>ChatGPT Unblocked </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-8">
        <h1 className="sm:text-6xl text-4xl mb-3 font-bold text-black">
          Use ChatGPT{" "}
          <span className="glitch" data-text="Unblocked">
            Unblocked
          </span>
          {/* {props.user ? <div>user :{props.user.displayName}</div> : null}
          <div>user :{ JSON.stringify(props.FBuser.requests?.map((r:any)=> r.Res)) }</div> */}
        </h1>

        {/* make simple styled sign in button with tailwind*/}
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

        <div className="pt-8 text-3xl border-b-2 pb-8">
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
        <div className="pt-8 text-3xl border-b-2 pb-8">
          <div className="flex items-center max-w-3xl">
            <div className="font-bold w-3/12 text-5xl ">Step 2: </div>
            <div className=" w-9/12">
              <div>
                Use 1000 complementary tokens daily (good for about two 350 word
                essays)
              </div>
              <div className="m-4">OR</div>
              <div>
                Go to OpenAI and get your API key for uninhibited use!{" "}
                <span className="linear-wipe"><Link href='/apikey' >More information ↗ </Link></span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 pb-2 text-xl">
          <div className="flex items-center max-w-3xl w-192">
            <div className="font-bold w-3/12 text-xl ">Step 3: </div>
            <div className=" w-9/12">Enter Any ChatGPT Prompt</div>
          </div>
        </div>

        {/* <button
          onClick={() => {
            checkUsedTokens();
          }}
          className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-5  hover:bg-black/80 w-full"
        >
          Tes
        </button> */}

        {/* <p className="text-slate-500 mt-5">47,118 bios generated so far.</p> */}
        <div className="max-w-3xl w-full">
          {/* <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Enter Your API key:
            </p>
          </div>
          <textarea
          // api key
            onChange={(e) => setKey(e.target.value)}
            rows={1}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "API Key"
            }
          /> */}
          {/* <div className="flex items-center mt-3 space-x-3">

            <p className="text-left font-medium">Step 3: Enter Your Prompt:</p>
          </div> */}
          <textarea
            // value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={"Any ChatGPT prompt"}
          />
          <div className={70 - prompt.length >= 0 ? "" : "text-red-500"}>
            Remaining Chars: {70 - prompt.length}
          </div>

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-5  hover:bg-black/80 w-full"
              onClick={(e) => {
                !props.user
                  ? toast.error("Please Sign In", {})
                  : prompt.length == 0
                  ? toast.error("Please enter a prompt!", {})
                  : checkUsedTokens() < 1000
                  ? 70 - prompt.length >= 0
                    ? generateBio(e)
                    : toast(
                        "Due to current ChatGPT Unblocked Limitations, the prompt must be limited to 70 chars",
                        {}
                      )
                  : toast(
                      "You have reached your daily limit of 1000 tokens. Please wait or add your API key.",
                      {}
                    );
              }}
            >
              Get Response &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-5  hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-10">
              {generatedBios && (
                <>
                  <div>
                    <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                      Response:
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                    <div
                      className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition border"
                      
                      // key={generatedBios}
                    >
                      <p>{generatedBios}</p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

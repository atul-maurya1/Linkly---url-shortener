import { useState, useEffect } from "react";
import { FaRegCopy } from "react-icons/fa6";
import axios from 'axios'

const CreateLink = () => {

  const [url, setUrl] = useState("")
  const [uniqueCode , setUniqueCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [shortUrl , setShortUrl] = useState("")
  const [error , setError] = useState("")
  const [copy, setCopy] = useState(false)
  


  const handleOnClick = async (e) => {
    e.preventDefault()
   // console.log(url)
    
    try{
      setLoading(true)
      setError("")
      const res = await axios.post("https://linkly-url-shortener-4gr0.onrender.com/api/v1/url/take-url", 
        {url, uniqueCode},
        { withCredentials: true }
      )

      setShortUrl(res?.data?.data?.shortUrl)
           
      setUrl("")
      setUniqueCode("")

    }catch(e){
      setError(e?.response?.data?.message)
     // console.log("error ", )
     

    }finally{
     setLoading(false)
     
    }

  }

  const handleOnCopy = async (e) => {
   
    e.preventDefault()
     setCopy(true)
    await navigator.clipboard.writeText(shortUrl)
    alert("Links Copied")
    setCopy(false)
  } 

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100 py-12 px-4">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <section className="rounded-[36px] bg-white/90 p-10 shadow-xl shadow-slate-200 backdrop-blur-sm">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Shorten a Long Link</h1>
            <p className="mt-4 text-lg text-slate-600">Create short, shareable links in seconds with a polished and easy-to-use experience.</p>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] bg-white p-8 shadow-lg shadow-slate-200">
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Enter long link</label>
                <input
                  value={url}
                  onChange={(e) => (setUrl(e?.target?.value), setError(""))}
                  type="url"
                  required
                  placeholder="https://example.com/very-long-url"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Custom alias <span className="text-slate-400">(optional)</span></label>
                <input
                  value={uniqueCode}
                  onChange={(e) => (setUniqueCode(e?.target?.value), setError(""))}
                  type="text"
                  required
                  placeholder="my-special-link"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <p className="text-red-500 p-3" >{error}</p>
              </div>
              <button
                onClick={handleOnClick}
                className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-blue-700 active:scale-95"
                type="button"
              >
               { loading ?  "Creating Link..." : "Shorten Link" }
              </button>
            </div>
          </div>

          <div className="rounded-[32px] bg-blue-900/95 p-8 text-white shadow-lg shadow-slate-300/30">
            <p className="text-sm uppercase tracking-[0.24em] text-blue-200/80">Shortened link preview</p>
            <div className="mt-6 rounded-[28px] bg-slate-950/10 p-6">
              <p className="text-sm text-slate-300">Your link will appear here once shortened.</p>
              <p className="mt-4 break-all text-2xl font-semibold text-white"> {shortUrl || "yourShort.url"}</p>
            </div>
            <button onClick={handleOnCopy}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
            >
              <FaRegCopy size={18} />
               {copy ? "Copied Link": "Copy link"}
            </button>
            <p className="mt-4 text-sm text-slate-300">Copy the shortened link to share it instantly. Customize the alias to make it easy to remember.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateLink;

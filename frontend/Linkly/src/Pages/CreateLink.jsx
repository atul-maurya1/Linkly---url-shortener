import InputLink from "../components/InputLink"
import { FaRegCopy } from "react-icons/fa6";


const CreateLink = () => {
    return(
      <div className="from-blue-50 to-indigo-100">
        <div className="flex flex-col items-center justify-center gap-8 py-12 px-4">
          <h1 className="text-3xl md:text-5xl text-blue-700 font-bold font-poppins text-center">Shorten a Long Link</h1>
          <p className="text-lg text-gray-600 text-center max-w-md">Create short, shareable links in seconds</p>
        </div>
        <div className="flex justify-center px-4 pb-12 ">
          <InputLink />
          
        </div>
          
          <div className="flex justify-around py-5">
            <button className="font-poppins text-blue-600 transition duration-150 active:scale-95 active:text-blue-800" type="button">
              linkly/sdhk
            </button>
            <button className="flex items-center justify-center rounded-full p-2 text-blue-600 transition duration-150 hover:bg-blue-100 active:scale-95" type="button">
              <FaRegCopy size={20} />
            </button>
          </div>
      
      </div>
    )
}

export default CreateLink
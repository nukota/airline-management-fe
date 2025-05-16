import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const CreateClassForm = () => {
  const [className, setClassName] = useState("");
  const [color, setColor] = useState("");
  const [priceBonusInterest, setPriceBonusInterest] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    let data = {
      className: className,
      color: color,
      priceBonusInterest: parseFloat(priceBonusInterest),
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SERVER}/ticket-class/create`,
      headers: {
        Authorization: session?.user.token,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log(response);

      if (response) {
        toast.success("Create Successful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setInterval(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (e) {
      console.log(e);
      toast.error("Error while create", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="collapse bg-slate-100">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-semibold">
        Create new ticket class
      </div>
      <div className="collapse-content ">
        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <div className="flex ">
            <div className="w-full ">
              <label
                htmlFor="className"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Class Name
              </label>
              <input
                id="className"
                type="text"
                placeholder="LV1"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className=" px-2 rounded-lg max-w-[150px] py-1"
              />
            </div>
            <div className="w-full px-3">
              <label
                htmlFor="color"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Color
              </label>
              <input
                id="color"
                type="text"
                placeholder="red"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className=" px-2 rounded-lg max-w-[150px] py-1"
              />
            </div>
          </div>
          <div className="flex ">
            <div className="w-full ">
              <label
                htmlFor="priceBonusInterest"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Price Bonus Interest
              </label>
              <input
                id="priceBonusInterest"
                type="number"
                placeholder="0.3"
                value={priceBonusInterest}
                onChange={(e) => setPriceBonusInterest(e.target.value)}
                className=" px-2 rounded-lg max-w-[150px] py-1"
              />
            </div>
            <div className="w-full items-end flex justify-end  px-3">
              <button
                type="submit"
                className="btn btn-sm bg-green-500 text-white"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClassForm;

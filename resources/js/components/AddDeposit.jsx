import React, { useEffect, useState } from "react";
import Select from "react-select";
import CategoryApis from "../apis/WithDrawApis";
import DepositApis from "../apis/DepositeApis";

function AddDeposit({
  setMessage,
  editFormData,
  editing,
  onCancelEdit,
  getDeposits,
}) {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [nameError, setNameError] = useState("");
  const [formData, setFormData] = useState({
    amount: 0,
  });

  useEffect(() => {
    getCategory();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
    if (onCancelEdit && editing) {
      onCancelEdit();
    }
  };

  const getCategory = async () => {
    const res = await CategoryApis.index();
    setCategories(res.data);
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.amount === 0) {
      setNameError("amount cannot be empty");
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("amount", formData.amount);

    sendFormData(formDataToSend);
  };

  const sendFormData = async (formDataToSend) => {
    const res = await DepositApis.save(formDataToSend);
    if (res.success) {
      setFormData({
        amount: ""
      });
      setMessage(res.data.message);
      setTimeout(() => {
        setMessage("");
      }, 2000);
      toggleModal();
      getDeposits();
    }
  };

  return (
    <>
      <div
        className="card border p-0 rounded-lg overflow-hidden cursor-pointer h-3/5 bg-[#04c342]"
        onClick={toggleModal}
      >
        <div className="bg-green-700 p-0">
          <div className="flex gap-1 items-center px-3 p-0">
            <span className=" text-[2rem] font-black text-white">
              +
            </span>
            <div className="mb-[5px] pt-2 font-bold text-white text-center">
              Add Deposite
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed z-[9999] inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <div className="relative bg-white rounded-lg left-12">
              {/* Your form content here */}
              <div className="flex justify-between border-b-[1px] border-[#e5e5e5] p-8">
                <h2 className="text-3xl font-black">
                  {editing ? "Edit Deposite" : "Add Deposite"}
                </h2>
                <button
                  onClick={toggleModal}
                  className=" text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form className="grid grid-cols-2 gap-12 mx-16 my-4">
                <div>
                  <div className="mb-4">
                    <label
                      htmlFor="item_name"
                      className="block"
                    >
                      Amount
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      id="item_name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-4  border-gray-300 rounded-md border h-14"
                      onChange={(e) =>
                        handleChange(
                          "amount",
                          e.target.value
                        )
                      }
                      required
                    />
                    {nameError && (
                      <span className="text-red-500">
                        {nameError}
                      </span>
                    )}
                  </div>
                </div>
              </form>
              <div className="flex justify-end border-t-[1px] p-8">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md mr-2 focus:outline-none hover:bg-gray-400 transition duration-150 ease-in-out drop-shadow-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none hover:bg-indigo-600 transition duration-150 ease-in-out drop-shadow-md"
                >
                  {editing ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddDeposit;

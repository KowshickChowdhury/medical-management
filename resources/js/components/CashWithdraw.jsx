import React, { useState, useEffect } from 'react';
import WithDrawApis from '../apis/WithDrawApis';

function CashWithDraw({ message, setMessage, editFormData, editing, onCancelEdit, getCategories }) {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        amount: 0,
    });

    const [nameError, setNameError] = useState('');

    const toggleModal = () => {
        setShowModal(!showModal);
        if (onCancelEdit && editing) {
            onCancelEdit();
        }
    };

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'amount' && value === 0) {
            setNameError('Amount cannot be empty');
        } else {
            setNameError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.amount === 0) {
            setNameError('Amount cannot be empty');
            return;
        }
        // Create category
        const res = await WithDrawApis.save(formData);
        if (res.success) {
            setMessage(res.data.message);
            setTimeout(() => {
                setMessage('');
            }, 2000);
            toggleModal();
            getCategories();
        }
    };

    return (
        <>
            <div className='card border p-0 rounded-lg overflow-hidden cursor-pointer h-3/5 bg-[#04c342]' onClick={toggleModal}>
                <div className='bg-green-700 p-0'>
                    <div className='flex gap-1 items-center px-3 p-0'>
                        <span className=' text-[2rem] font-black text-white'>+</span>
                        <div className='mb-[5px] pt-2 font-bold text-white text-center'>Withdraw</div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className='fixed z-[9999] inset-0 overflow-y-auto'>
                    <div className='flex items-center justify-center min-h-screen'>
                        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' aria-hidden='true'></div>
                        <div className='relative bg-white p-8 rounded-lg left-12'>
                            {/* Your form content here */}
                            <div className='flex justify-between mb-8 border-b-[1px] border-[#e5e5e5]'>
                                <h2 className='text-2xl font-black'>Withdraw</h2>
                                <button
                                    onClick={toggleModal}
                                    className=' text-gray-500 hover:text-gray-700 focus:outline-none'>
                                    <svg
                                        className='h-6 w-6'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                                    </svg>
                                </button>
                            </div>
                            {message && (
                                <div className='border px-4 py-3 mt-5 rounded relative bg-green-100 border-green-400 text-green-700' role='alert'>
                                    <span className='block sm:inline'>{message}</span>
                                </div>
                            )}
                            <form className='grid grid-cols-2 gap-28'>
                                <div>
                                    <div className='mb-4'>
                                        <label className='block'>Amount</label>
                                        <input
                                            type='number'
                                            name='amount'
                                            id='amount'
                                            value={formData.amount}
                                            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-4 border-gray-300 rounded-md drop-shadow-md border h-14'
                                            onChange={(e) => handleChange('amount', e.target.value)}
                                            required
                                        />
                                        {nameError && <span className='text-red-500'>{nameError}</span>}
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='flex justify-end items-center'>
                                        <button
                                            type='button'
                                            onClick={toggleModal}
                                            className='bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md mr-2 focus:outline-none hover:bg-gray-400 transition duration-150 ease-in-out'>
                                            Cancel
                                        </button>
                                        <button
                                            type='submit'
                                            onClick={handleSubmit}
                                            className='bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none hover:bg-indigo-600 transition duration-150 ease-in-out'>
                                            {editing ? 'Update' : 'Withdraw'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CashWithDraw;

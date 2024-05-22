import React, { useEffect, useState } from 'react';
import AddCategory from '../components/CashWithdraw';
import CategoryApis from '../apis/WithDrawApis';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import AddDeposit from '../components/AddDeposit';
import DepositApis from '../apis/DepositeApis';

function Deposit() {
    const [message, setMessage] = useState('');
    const [deposits, setDeposits] = useState([]);
    const [editFormData, setEditFormData] = useState(null); // State to store data for editing
    const [editing, setEditing] = useState(false); // State to track if editing mode is active

    useEffect(() => {
        getDeposits();
    }, []);

    const getDeposits = async () => {
        const res = await DepositApis.index();
        if (res) {
            setDeposits(res);
        }
    };

    const handleEditItem = (item) => {
        setEditFormData(item);
        setEditing(true);
    };

    const handleCancelEdit = () => {
        setEditFormData(null);
        setEditing(false);
    };

    const handleDeleteItem = async (itemId) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this item?");

        if (shouldDelete) {
            const res = await ItemApis.delete(itemId);
            if (res.success) {
                setMessage(res.data.message);
                setTimeout(() => {
                    setMessage('');
                }, 2000);
                getDeposits();
            }
        } else {
            // User clicked "Cancel" or closed the dialog
            console.log("Delete canceled");
        }
    };

    let ItemRows = '';
    if (deposits && deposits.length > 0) {
        ItemRows = deposits.map((deposit) => (
            <tr key={deposit.id}>
                <td className='table-name'>{deposit.type}</td>
                <td>{deposit.amount}</td>
                <td>{deposit.fee}</td>
                {/* <td>{item.inventory.name}</td> */}
            </tr>
        ));
    }

    return (
        <>
            <div className='mx-4 my-4'>
                <div className='flex justify-between'>
                    <h1>Deposit</h1>
                    <AddDeposit
                        setMessage={setMessage}
                        message={message}
                        getDeposits={getDeposits}
                        editFormData={editFormData}
                        editing={editing}
                        onCancelEdit={handleCancelEdit}
                    />
                </div>
                {message && (
                    <div className='border px-4 py-3 mt-5 rounded relative bg-green-100 border-green-400 text-green-700' role='alert'>
                        <span className='block sm:inline'>{message}</span>
                    </div>
                )}
                <div className='table-responsive-md mt-4'>
                    <table className='table table-hover details'>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Fee</th>
                            </tr>
                        </thead>
                        <tbody>{ItemRows}</tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Deposit;

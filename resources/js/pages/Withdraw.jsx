import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import CashWithDraw from '../components/CashWithdraw';
import WithDrawApis from '../apis/WithDrawApis';

function WithDraw() {
    const [message, setMessage] = useState('');
    const [withDraws, setWithDraws] = useState([]);
    const [editFormData, setEditFormData] = useState(null); // State to store data for editing
    const [editing, setEditing] = useState(false); // State to track if editing mode is active

    useEffect(() => {
        getWithDraws();
    }, []);

    const getWithDraws = async () => {
        const res = await WithDrawApis.index();
        console.log('res', res)
        if (res) {
            setWithDraws(res);
        }
    };
    console.log('wi', withDraws)

    const handleEditCategory = (category) => {
        setEditFormData(category);
        setEditing(true);
    };

    const handleCancelEdit = () => {
        setEditFormData(null);
        setEditing(false);
    };

    const handleDeleteCategory = async (categoryId) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this attendance?");

        if (shouldDelete) {
            const res = await CategoryApis.delete(categoryId);
            if (res.success) {
                setMessage(res.data.message);
                setTimeout(() => {
                    setMessage('');
                }, 2000);
                getWithDraws();
            }
        } else {
            // User clicked "Cancel" or closed the dialog
            console.log("Delete canceled");
        }
    };

    let categoryRows = '';
    if (withDraws) {
        categoryRows = withDraws.map((withdraw) => (
            <tr key={withdraw.id}>
                <td className='table-name'>{withdraw.type}</td>
                <td>{withdraw.amount}</td>
                <td>{withdraw.fee}</td>
            </tr>
        ));
    }

    return (
        <>
            <div className='mx-4 my-4'>
                <div className='flex justify-between'>
                    <h1>Withdraw</h1>
                    <CashWithDraw
                        setMessage={setMessage}
                        message={message}
                        getWithDraws={getWithDraws}
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
                        <tbody>{categoryRows}</tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default WithDraw;

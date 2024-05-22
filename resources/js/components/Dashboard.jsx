import React, { useContext, useEffect, useState } from "react";
import DepositApis from "../apis/DepositeApis";
import WithDrawApis from "../apis/WithDrawApis";

function Dashboard() {
    const [deposits, setDeposits] = useState([]);
    const [withdraw, setWithDraw] = useState([]);
    const [transtions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [depositCount, setDepositCount] = useState(0);
    const [withDrawCount, setWithDrawCount] = useState(0);

    // console.log('example', example)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const depositRes = await DepositApis.index();
            const withDrawRes = await WithDrawApis.index();
            const transaction = await WithDrawApis.transac();
            setBalance(transaction.map((transaction) => (transaction.user.balance)));
            setTransactions(transaction);
            setDeposits(depositRes);
            setDepositCount(depositRes.length);
            setWithDraw(withDrawRes);
            setWithDrawCount(withDrawRes.length);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <>
        <div className="flex justify-between items-center p-4">
            <div className="text-xl font-medium">
                Banking Management System
            </div>
            <div className="font-bold">
              Available Balance: {balance[0]}
            </div>
        </div>
            <div className="grid md:grid-cols-2 gap-32 p-4">
                <div className="bg-[#d1f4ff] p-4">
                    <div className="grid grid-cols-2">
                        <h2 className="text-2xl font-bold mb-2">Deposites</h2>
                        <p className="mt-[5px] ml-[18px] md:ml-[92px]">
                            Total Deposits: {depositCount}
                        </p>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deposits?.map((deposit) => (
                                <tr key={deposit.id}>
                                    <td className="border px-4 py-2">
                                        {deposit.amount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-[#d1f4ff] p-4">
                    <div className="grid grid-cols-2">
                        <h2 className="text-2xl font-bold mb-2">Withdrawals</h2>
                        <p className="mt-[5px] ml-[70px] md:ml-[125px]">
                            Total Withdrawal: {withDrawCount}
                        </p>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {withdraw?.map((withdraw) => (
                                <tr key={withdraw.id}>
                                    <td className="border px-4 py-2">
                                        {withdraw.amount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="p-4">
                <div className="bg-[#d1f4ff] p-4">
                    <div className="grid grid-cols-2">
                        <h2 className="text-2xl font-bold mb-2">
                            Transactions
                        </h2>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Type</th>
                                <th className="px-4 py-2">Amount</th>
                                <th className="px-4 py-2">Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transtions?.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td className="border px-4 py-2">
                                        {transaction.type}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {transaction.amount}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {transaction.fee}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Dashboard;

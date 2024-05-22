<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\User;
use App\Traits\CommonTrait;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    use CommonTrait;

    public function index()
    {
        $user_id = Auth::id();
        $transactions = Transaction::with('user')->where('user_id', $user_id)->get();
        return response()->json($transactions);
    }

    public function showDeposits()
    {
        $user_id = Auth::id();
        $deposits = Transaction::where('type', 'deposit')->where('user_id', $user_id)->get();
        return response()->json($deposits);
    }

    public function deposit(Request $request)
    {
        $validatedData = $request->validate([
            'amount' => 'required|numeric|min:0.01'
        ]);

        $user_id = Auth::id();
        $user = User::find($user_id);
        $user->balance += $validatedData['amount'];
        $user->save();

        $transaction = Transaction::create([
            'user_id' => $user_id,
            'type' => 'deposit',
            'amount' => $validatedData['amount'],
            'fee' => 0
        ]);

        return $this->sendResponse($transaction);
    }

    public function showWithdrawals()
    {
        $user_id = Auth::id();
        $withdrawals = Transaction::where('type', 'withdrawal')->where('user_id', $user_id)->get();
        return response()->json($withdrawals);
    }

    public function withdraw(Request $request)
    {
        $validatedData = $request->validate([
            'amount' => 'required|numeric|min:0.01'
        ]);

        $user_id = Auth::id();

        $user = User::find($user_id);
        $amount = $validatedData['amount'];
        $fee = $this->calculateFee($user, $amount);

        if ($user->balance < ($amount + $fee)) {
            return response()->json(['error' => 'Insufficient funds'], 400);
        }

        $user->balance -= ($amount + $fee);
        $user->save();

        $transaction = Transaction::create([
            'user_id' => $user_id,
            'type' => 'withdrawal',
            'amount' => $amount,
            'fee' => $fee
        ]);

        return $this->sendResponse($transaction);
    }

    private function calculateFee(User $user, $amount)
    {
        // Logic for calculating fees based on account type and conditions
        $fee = 0;
        $rate = $user->account_type === 'Business' ? 0.025 : 0.015;

        if ($user->account_type === 'Individual') {
            // Apply free withdrawal conditions
            $today = now()->format('Y-m-d');
            $firstFriday = now()->startOfMonth()->modify('first friday')->format('Y-m-d');
            if (now()->isFriday()) {
                return 0;
            }

            if ($amount <= 1000) {
                return 0;
            }

            $monthlyWithdrawals = Transaction::where('user_id', $user->id)
                ->where('type', 'withdrawal')
                ->whereMonth('created_at', now()->month)
                ->sum('amount');

            if ($monthlyWithdrawals <= 5000) {
                return 0;
            }

            return ($amount - 1000) * $rate;
        }

        if ($user->account_type === 'Business') {
            $totalWithdrawals = Transaction::where('user_id', $user->id)
                ->where('type', 'withdrawal')
                ->sum('amount');

            if ($totalWithdrawals > 50000) {
                $rate = 0.015;
            }

            return $amount * $rate;
        }

        return $amount * $rate;
    }
}


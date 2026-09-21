<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PpdbRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PpdbController extends Controller
{
    public function index()
    {
        $registrations = PpdbRegistration::orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'total' => $registrations->count(),
            'data' => $registrations,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'nisn' => 'nullable|string|max:15',
            'gender' => 'required|in:L,P',
            'birth_place' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'religion' => 'required|string|max:50',
            'previous_school' => 'required|string|max:255',
            'major' => 'required|string|max:100',
            'path' => 'required|in:Prestasi,Zonasi,Afirmasi',
            'parent_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Data pendaftaran tidak valid.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $registration = DB::transaction(function () use ($validator) {
            $number = PpdbRegistration::lockForUpdate()->count() + 1;
            $data = $validator->validated();
            $data['registration_number'] = sprintf('PPDB-2026-%05d', $number);

            return PpdbRegistration::create($data);
        });

        return response()->json([
            'success' => true,
            'message' => 'Pendaftaran PPDB berhasil! Simpan nomor pendaftaran Anda.',
            'data' => $registration,
        ], 201);
    }
}

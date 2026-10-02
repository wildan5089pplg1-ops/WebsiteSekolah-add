<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Traits\ApiResponseTrait;

class PpdbController extends Controller
{
    use ApiResponseTrait;
    public function index(Request $request)
    {
        $request->validate([
            'per_page' => 'sometimes|integer|min:1|max:100'
        ]);

        $perPage = (int) $request->input('per_page', 20);
        $registrations = PpdbRegistration::orderBy('id', 'desc')->paginate($perPage);

        return $this->paginatedResponse($registrations, 'Data PPDB berhasil dimuat');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name'       => 'required|string|max:255',
            // 2. FIX [HIGH]: Tambahkan unique rule untuk menghindari SPAM NISN
            'nisn'            => 'nullable|string|max:15|unique:ppdb_registrations,nisn',
            'gender'          => 'required|in:L,P',
            'birth_place'     => 'required|string|max:255',
            'birth_date'      => 'required|date',
            'religion'        => 'required|string|max:50',
            'previous_school' => 'required|string|max:255',
            'major'           => 'required|string|max:100',
            'path'            => 'required|in:Prestasi,Zonasi,Afirmasi',
            'parent_name'     => 'required|string|max:255',
            'phone'           => 'required|string|max:20',
            'email'           => 'nullable|email|max:255',
            'address'         => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Data pendaftaran tidak valid.',
                'errors'  => $validator->errors(),
            ], 422);
        }

        try {
            $registration = DB::transaction(function () use ($validator) {
                $data = $validator->validated();
                
                // Sanitasi input (Defense-in-Depth XSS)
                $stringFields = ['full_name', 'nisn', 'birth_place', 'previous_school', 'parent_name', 'phone', 'address', 'major', 'religion'];
                foreach ($stringFields as $field) {
                    if (isset($data[$field])) {
                        $data[$field] = strip_tags($data[$field]);
                    }
                }
                
                // Berikan placeholder sementara yang pasti unik
                $data['registration_number'] = 'TMP-' . uniqid();

                $ppdb = PpdbRegistration::create($data);
                
                // Gunakan ID Auto Increment asli untuk menghilangkan 100% Race Condition / Deadlock
                $currentYear = date('Y');
                $realRegNumber = sprintf("PPDB-%s-%05d", $currentYear, $ppdb->id);
                
                $ppdb->update(['registration_number' => $realRegNumber]);

                return $ppdb;
            });

            return response()->json([
                'success' => true,
                'message' => 'Pendaftaran PPDB berhasil! Simpan nomor pendaftaran Anda.',
                'data'    => $registration,
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan sistem saat memproses pendaftaran. Silakan coba lagi.',
                'error'   => env('APP_DEBUG') ? $e->getMessage() : 'Database error',
            ], 500);
        }
    }
}

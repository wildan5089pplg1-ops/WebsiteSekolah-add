<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\PpdbService;

class PpdbController extends Controller
{
    protected $ppdbService;

    public function __construct(PpdbService $ppdbService)
    {
        $this->ppdbService = $ppdbService;
    }

    public function index()
    {
        $registrations = $this->ppdbService->getAllRegistrations();

        return response()->json([
            'success' => true,
            'total' => $registrations->count(),
            'data' => $registrations,
        ]);
    }

    /**
     * Menerima pendaftaran calon siswa baru dari form pengguna umum.
     */
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

        $registration = $this->ppdbService->createRegistration($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Pendaftaran PPDB berhasil! Simpan nomor pendaftaran Anda.',
            'data' => $registration,
        ], 201);
    }
}

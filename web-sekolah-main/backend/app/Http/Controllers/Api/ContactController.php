<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Traits\ApiResponseTrait;

class ContactController extends Controller
{
    use ApiResponseTrait;

    public function index(Request $request)
    {
        $request->validate([
            'per_page' => 'sometimes|integer|min:1|max:100'
        ]);

        $perPage = (int) $request->input('per_page', 20);
        $messages = ContactMessage::orderBy('id', 'desc')->paginate($perPage);
        
        // FIX [LOW]: Gunakan paginatedResponse() agar format JSON konsisten dengan endpoint lain
        return $this->paginatedResponse($messages, 'Data pesan kontak berhasil dimuat');
    }

    public function destroy($id)
    {
        $message = ContactMessage::find($id);
        if (!$message) {
            return $this->errorResponse('Pesan tidak ditemukan', 404);
        }
        
        $message->delete();
        return $this->successResponse(null, 'Pesan berhasil dihapus');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'           => 'required|string|max:255',
            'email_or_phone' => 'required|string|max:255',
            'category'       => 'required|string|max:255',
            // FIX [HIGH]: Batasi ukuran payload untuk mencegah Memory Exhaustion (DoS)
            'message'        => 'required|string|max:3000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors'  => $validator->errors()
            ], 422);
        }

        $validatedData = $validator->validated();

        // FIX [MEDIUM]: Sanitasi input untuk mencegah serangan Stored XSS
        $validatedData['name'] = strip_tags($validatedData['name']);
        $validatedData['email_or_phone'] = strip_tags($validatedData['email_or_phone']);
        $validatedData['category'] = strip_tags($validatedData['category']);
        $validatedData['message'] = strip_tags($validatedData['message']);

        $contact = ContactMessage::create($validatedData);

        return $this->successResponse($contact, 'Pesan berhasil dikirim', 201);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function index()
    {
        $messages = ContactMessage::orderBy('created_at', 'desc')->get();
        return response()->json([
            'success' => true,
            'data' => $messages
        ]);
    }

    public function destroy($id)
    {
        $message = ContactMessage::find($id);
        if (!$message) {
            return response()->json(['success' => false, 'message' => 'Pesan tidak ditemukan'], 404);
        }
        $message->delete();
        return response()->json(['success' => true, 'message' => 'Pesan berhasil dihapus']);
    }

    /**
     * Menyimpan data pesan kontak yang dikirim oleh pengguna umum.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email_or_phone' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $contact = ContactMessage::create($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Pesan berhasil dikirim',
            'data' => $contact
        ], 201);
    }
}

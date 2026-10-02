<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Karir;
use Illuminate\Support\Facades\Validator;

class KarirController extends Controller
{
    private function getValidationRules()
    {
        return [
            'nama_pekerjaan' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'jurusan' => 'required|string|in:PPLG,TJKT,DKV,BCF',
            'link' => 'nullable|url'
        ];
    }

    public function index()
    {
        $karirs = Karir::orderBy('created_at', 'desc')->limit(200)->get();
        return response()->json([
            'status' => 'success',
            'data' => $karirs
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->getValidationRules());

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $karir = Karir::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Karir berhasil ditambahkan',
            'data' => $karir
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $karir = Karir::find($id);

        if (!$karir) {
            return response()->json([
                'status' => 'error',
                'message' => 'Karir tidak ditemukan'
            ], 404);
        }

        $validator = Validator::make($request->all(), $this->getValidationRules());

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $karir->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Karir berhasil diperbarui',
            'data' => $karir
        ], 200);
    }

    public function destroy($id)
    {
        $karir = Karir::find($id);

        if (!$karir) {
            return response()->json([
                'status' => 'error',
                'message' => 'Karir tidak ditemukan'
            ], 404);
        }

        $karir->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Karir berhasil dihapus'
        ], 200);
    }
}

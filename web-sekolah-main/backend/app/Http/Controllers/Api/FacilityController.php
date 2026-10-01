<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use Illuminate\Http\Request;
use App\Http\Traits\ApiResponseTrait;

class FacilityController extends Controller
{
    use ApiResponseTrait;

    public function index()
    {
        $facilities = Facility::all();
        return $this->successResponse($facilities, 'Data fasilitas berhasil dimuat');
    }
}

<?php

namespace App\Services;

use App\Models\PpdbRegistration;
use Illuminate\Support\Facades\DB;

class PpdbService
{
    public function getAllRegistrations()
    {
        return PpdbRegistration::orderBy('created_at', 'desc')->get();
    }

    public function createRegistration(array $data)
    {
        return DB::transaction(function () use ($data) {
            $number = PpdbRegistration::lockForUpdate()->count() + 1;
            $data['registration_number'] = sprintf('PPDB-2026-%05d', $number);

            return PpdbRegistration::create($data);
        });
    }
}

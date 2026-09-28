<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // FIX [CRITICAL]: Ganti updateOrCreate menjadi firstOrCreate 
        // agar tidak mereset paksa password admin yang sudah diubah di production.
        User::firstOrCreate(
            ['email' => 'admin@sman1antigravity.sch.id'],
            [
                'name'     => 'Administrator',
                // FIX [CRITICAL]: Ambil password dari .env agar tidak hardcoded. 
                // Anda bisa menambahkan ADMIN_PASSWORD=rahasia123 di file .env server Anda.
                'password' => Hash::make(env('ADMIN_PASSWORD', 'admin12345')),
            ]
        );
    }
}

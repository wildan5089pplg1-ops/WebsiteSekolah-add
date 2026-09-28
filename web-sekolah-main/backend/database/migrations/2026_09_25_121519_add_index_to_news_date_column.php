<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('news', function (Blueprint $table) {
            // FIX [LOW]: Tambahkan index pada kolom 'date' karena digunakan
            // sebagai ORDER BY di NewsController. Tanpa ini, MySQL melakukan
            // full filesort yang lambat ketika berita semakin banyak.
            $table->index('date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('news', function (Blueprint $table) {
            $table->dropIndex(['date']);
        });
    }
};

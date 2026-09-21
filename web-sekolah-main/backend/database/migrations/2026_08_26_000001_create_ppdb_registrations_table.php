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
        Schema::create('ppdb_registrations', function (Blueprint $table) {
            $table->id();
            $table->string('registration_number', 30)->unique();
            $table->string('full_name');
            $table->string('nisn', 15)->nullable();
            $table->enum('gender', ['L', 'P']);
            $table->string('birth_place');
            $table->date('birth_date');
            $table->string('religion');
            $table->string('previous_school');
            $table->string('major');
            $table->enum('path', ['Prestasi', 'Zonasi', 'Afirmasi']);
            $table->string('parent_name');
            $table->string('phone', 20);
            $table->string('email')->nullable();
            $table->text('address');
            $table->enum('status', ['pending', 'diterima', 'cadangan', 'ditolak'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ppdb_registrations');
    }
};

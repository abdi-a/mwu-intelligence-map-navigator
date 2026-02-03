<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->timestamps();
        });

        Schema::create('buildings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->string('image_url')->nullable();
            $table->timestamps();
        });

        Schema::create('campus_boundaries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->json('geometry'); 
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('campus_boundaries');
        Schema::dropIfExists('buildings');
        Schema::dropIfExists('categories');
    }
};

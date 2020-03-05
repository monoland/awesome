<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $avtr = 'data:image/png;base64, ' . base64_encode(
                file_get_contents(public_path('images' . DIRECTORY_SEPARATOR . 'user-holder.png'))
            );

            $bgrn = 'data:image/jpeg;base64, ' . base64_encode(
                file_get_contents(public_path('images' . DIRECTORY_SEPARATOR . 'draw-holder.jpg'))
            );

            $table->bigIncrements('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->text('avatar')->nullable()->default($avtr);
            $table->text('background')->nullable()->default($bgrn);
            $table->string('theme')->default('blue-grey');
            $table->unsignedBigInteger('role_id')->nullable()->index();
            $table->nullableMorphs('userable');
            $table->boolean('active')->default(true);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}

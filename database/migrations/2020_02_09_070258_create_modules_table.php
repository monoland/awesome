<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('modules', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('path');
            $table->string('icon');
            $table->string('maps')->nullable();
            $table->boolean('menu')->default(false);
            $table->string('apps')->default(env('APP_NAME'));
            $table->nestedSet();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('roles_has_modules', function (Blueprint $table) {
            $table->unsignedBigInteger('role_id')->index();
            $table->unsignedBigInteger('module_id')->index();

            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
            $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');

            $table->primary(['role_id', 'module_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('modules');
        Schema::dropIfExists('roles_has_modules');
    }
}

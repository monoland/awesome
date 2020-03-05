<?php

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $setting = new Setting();
        $setting->name = 'web-info';
        $setting->company = 'MONOLAND';
        $setting->companyExtended = 'AWESOME';
        $setting->product = 'let\'s build';
        $setting->productExtended = 'Awesome Apps';
        $setting->slogan = 'LARAVEL + VUEJS + VUETIFY = AWESOME';
        $setting->description = '<a href="https://github.com/monoland/monoland" target="_blank">Monoland</a> adalah sebuah penggabungan dari expressive dan elegant syntax PHP + Modern Javascript Framework yang di bangun dari <a href="https://laravel.com/" target="_blank">Laravel</a> untuk Backend, dan <a href="https://vuejs.org" target="_blank">Vuejs</a> dan <a href="https://vuetifyjs.com" target="_blank">Vuetify</a> pada Frontend.';
        $setting->logo = DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo-holder.png';
        $setting->background = DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'back-holder.jpeg';
        $setting->save();
    }
}

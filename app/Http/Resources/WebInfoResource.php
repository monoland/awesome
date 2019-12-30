<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WebInfoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'name' => optional($this)->name ?: 'MONOLAND',
            'nameExtended' => optional($this)->nameExtended ?: 'AWESOME',
            'title' => optional($this)->title ?: 'let\'s build',
            'titleExtended' => optional($this)->titleExtended ?: 'Awesome Apps',
            'subtitle' => optional($this)->subtitle ?: 'LARAVEL + VUEJS + VUETIFY = AWESOME',
            'quote' => optional($this)->quote ?: '<a href="https://github.com/monoland/awesome" target="_blank">Monoland</a> adalah sebuah penggabungan dari expressive dan elegant syntax PHP + Modern Javascript Framework yang di bangun dari <a href="https://laravel.com/" target="_blank">Laravel</a> untuk Backend, dan <a href="https://vuejs.org" target="_blank">Vuejs</a> dan <a href="https://vuetifyjs.com" target="_blank">Vuetify</a> pada Frontend.',
            'logo' => optional($this)->logo ?: url('/images/logo-holder.png'),
            'background' => optional($this)->background ?: url('/images/back-holder.jpg'),
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        if ($this->drve === 'public') {
            $path = url('storage' . DIRECTORY_SEPARATOR . $this->slug);
        } else {
            if ($this->kind === 'user-background' || $this->kind === 'user-avatar') {
                $path = 'data:' . $this->mime . ';base64, ' . base64_encode(file_get_contents(
                    storage_path($this->drve . DIRECTORY_SEPARATOR . sha1($request->user()->id) . DIRECTORY_SEPARATOR . $this->slug)
                ));
            } else {
                $path = url('api' . DIRECTORY_SEPARATOR . 'document' . DIRECTORY_SEPARATOR . $this->slug);
            }
        }

        return [
            'id' => $this->slug,
            'name' => $this->name,
            'path' => $path,
            'byte' => $this->byte,
            'extn' => $this->extn,
            'type' => $this->type,
            'mime' => $this->mime,
            'updated_at' => (string) $this->updated_at,

            'mobile_title' => $this->name,
            'mobile_subtitle' => "updated: {$this->updated_at}",
        ];
    }
}
